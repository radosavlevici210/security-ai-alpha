
// OpenAI Client for AI Studio Pro+ v10.0.0
// Owner: Ervin Remus Radosavlevici
// Email: radosavlevici210@icloud.com

class OpenAIClient {
    constructor() {
        this.baseURL = window.location.origin;
        this.connected = false;
        this.testConnection();
    }

    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/api/openai/test`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'
            });

            const result = await response.json();
            this.connected = result.success;
            
            console.log('🤖 OpenAI Connection Status:', this.connected ? 'Connected' : 'Disconnected');
            
            // Update UI connection indicator
            this.updateConnectionStatus(this.connected);
            
            return result;
        } catch (error) {
            console.error('OpenAI connection test failed:', error);
            this.connected = false;
            this.updateConnectionStatus(false);
            return { success: false, error: error.message };
        }
    }

    async generateText(prompt, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}/api/openai/text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors',
                body: JSON.stringify({
                    prompt: prompt,
                    options: {
                        model: options.model || 'gpt-4',
                        maxTokens: options.maxTokens || 2000,
                        temperature: options.temperature || 0.7,
                        systemPrompt: options.systemPrompt
                    }
                })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('OpenAI text generation failed:', error);
            return { success: false, error: error.message };
        }
    }

    async generateImage(prompt, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}/api/openai/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    options: {
                        model: options.model || 'dall-e-3',
                        size: options.size || '1024x1024',
                        quality: options.quality || 'standard',
                        style: options.style || 'vivid',
                        count: options.count || 1
                    }
                })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('OpenAI image generation failed:', error);
            return { success: false, error: error.message };
        }
    }

    async generateSpeech(text, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}/api/openai/speech`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    options: {
                        voice: options.voice || 'alloy',
                        speed: options.speed || 1.0
                    }
                })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('OpenAI speech generation failed:', error);
            return { success: false, error: error.message };
        }
    }

    updateConnectionStatus(connected) {
        // Update connection indicator in UI
        const indicator = document.getElementById('openai-status');
        if (indicator) {
            indicator.innerHTML = connected 
                ? '<span style="color: #00ff88;">🟢 OpenAI Connected</span>'
                : '<span style="color: #ff4444;">🔴 OpenAI Disconnected</span>';
        }

        // Update any OpenAI-dependent features
        const openaiFeatures = document.querySelectorAll('.openai-feature');
        openaiFeatures.forEach(feature => {
            feature.style.opacity = connected ? '1' : '0.5';
            if (!connected) {
                feature.title = 'OpenAI API not connected';
            }
        });
    }

    // Utility method to enhance existing AI functions with OpenAI
    async enhanceWithOpenAI(type, content, options = {}) {
        switch (type) {
            case 'script-analysis':
                return await this.generateText(
                    `Analyze this movie script and provide detailed production information: ${content}`,
                    {
                        systemPrompt: 'You are a professional film analysis AI. Provide detailed script analysis.',
                        maxTokens: 2000
                    }
                );
            
            case 'music-composition':
                return await this.generateText(
                    `Create a detailed music composition based on: ${content}`,
                    {
                        systemPrompt: 'You are a professional music composer. Provide detailed composition instructions.',
                        maxTokens: 1500
                    }
                );
            
            case 'voice-script':
                return await this.generateText(
                    `Optimize this voice script for professional synthesis: ${content}`,
                    {
                        systemPrompt: 'You are a voice optimization expert. Enhance scripts for voice synthesis.',
                        maxTokens: 1000
                    }
                );
            
            default:
                return await this.generateText(content, options);
        }
    }
}

// Initialize OpenAI client when page loads
let openaiClient;
document.addEventListener('DOMContentLoaded', () => {
    openaiClient = new OpenAIClient();
    console.log('🚀 OpenAI Client initialized for AI Studio Pro+ v10.0.0');
});
