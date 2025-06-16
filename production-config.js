
// AI Studio Pro+ v10.0.0 - Production Configuration
// Owner: Ervin Remus Radosavlevici
// Email: radosavlevici210@icloud.com

// Validate environment
console.log('🔧 Loading production configuration...');

const PRODUCTION_CONFIG = {
    VERSION: '10.0.0',
    OWNER: 'Ervin Remus Radosavlevici',
    EMAIL: 'radosavlevici210@icloud.com',
    
    // Server Configuration
    SERVER: {
        HOST: '0.0.0.0',
        PORT: process.env.PORT || 5000,
        CORS_DISABLED: true,
        SECURITY_RESTRICTIONS: false
    },
    
    // OpenAI Configuration
    OPENAI: {
        API_KEY: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY,
        ORG_ID: process.env.OPENAI_ORG_ID,
        DEFAULT_MODEL: 'gpt-4',
        MAX_TOKENS: 4000,
        TEMPERATURE: 0.7
    },
    
    // Feature Flags
    FEATURES: {
        REAL_AI_PROCESSING: true,
        UNLIMITED_ACCESS: true,
        NO_RATE_LIMITS: true,
        PRODUCTION_READY: true,
        ALL_FEATURES_ENABLED: true
    },
    
    // API Endpoints
    ENDPOINTS: {
        OPENAI: 'https://api.openai.com/v1',
        STABILITY: 'https://api.stability.ai/v1',
        ELEVENLABS: 'https://api.elevenlabs.io/v1'
    }
};

module.exports = PRODUCTION_CONFIG;
