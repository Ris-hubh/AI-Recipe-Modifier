import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// OpenAI API setup
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.post('/modify-recipe', async (req, res) => {
    const { recipe } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: `Please modify this recipe: ${recipe}` },
            ],
        });
    
        console.log(response.data); // Log the full response
    
        const modifiedRecipe = response.data.choices[0].message.content;
        res.json({ modifiedRecipe });
    } catch (error) {
        console.error('Error from OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error modifying the recipe.' });
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
