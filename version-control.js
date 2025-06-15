
// AI Studio Pro+ Version Control System
// Owner: Ervin Remus Radosavlevici (radosavlevici210@icloud.com)

const VersionControl = {
    // Version Configuration
    CONFIG: {
        CURRENT_VERSION: '8.0.0',
        MINIMUM_SUPPORTED: '7.5.0',
        LATEST_STABLE: '8.1.0',
        FORCE_UPGRADE_AFTER: new Date('2024-12-31'),
        CHECK_INTERVAL: 300000, // 5 minutes
        UPGRADE_ENDPOINT: 'https://api.radosavlevici-studio.com/upgrade'
    },
    
    // Version Database - Deprecated versions
    DEPRECATED_VERSIONS: [
        '1.0.0', '1.1.0', '1.2.0', '2.0.0', '2.1.0', '2.2.0',
        '3.0.0', '3.1.0', '3.2.0', '4.0.0', '4.1.0', '4.2.0',
        '5.0.0', '5.1.0', '5.2.0', '6.0.0', '6.1.0', '6.2.0',
        '7.0.0', '7.1.0', '7.2.0', '7.3.0', '7.4.0'
    ],
    
    // Security signatures for version validation
    SECURITY_HASHES: {
        '8.0.0': 'sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
        '8.1.0': 'sha256:b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7'
    },
    
    // Feature compatibility matrix
    FEATURE_COMPATIBILITY: {
        '8.0.0': ['movies', 'music', 'animation', 'voice', 'api'],
        '8.1.0': ['movies', 'music', 'animation', 'voice', 'api', 'advanced-ai', '8k-export']
    },
    
    // License validation
    validateLicense(userEmail) {
        const authorizedUsers = [
            'radosavlevici210@icloud.com',
            'admin@radosavlevici-studio.com'
        ];
        return authorizedUsers.includes(userEmail);
    },
    
    // Version comparison utility
    compareVersions(current, target) {
        const currentParts = current.split('.').map(Number);
        const targetParts = target.split('.').map(Number);
        
        for (let i = 0; i < Math.max(currentParts.length, targetParts.length); i++) {
            const currentPart = currentParts[i] || 0;
            const targetPart = targetParts[i] || 0;
            
            if (currentPart < targetPart) return -1;
            if (currentPart > targetPart) return 1;
        }
        return 0;
    },
    
    // Check if version is deprecated
    isDeprecated(version) {
        return this.DEPRECATED_VERSIONS.includes(version) || 
               new Date() > this.CONFIG.FORCE_UPGRADE_AFTER;
    },
    
    // Generate upgrade manifest
    generateUpgradeManifest(currentVersion) {
        return {
            currentVersion: currentVersion,
            latestVersion: this.CONFIG.LATEST_STABLE,
            isDeprecated: this.isDeprecated(currentVersion),
            forceUpgrade: this.compareVersions(currentVersion, this.CONFIG.MINIMUM_SUPPORTED) < 0,
            newFeatures: this.getNewFeatures(currentVersion),
            securityFixes: this.getSecurityFixes(currentVersion),
            upgradeSteps: this.getUpgradeSteps(currentVersion)
        };
    },
    
    // Get new features since version
    getNewFeatures(version) {
        const features = {
            '8.1.0': [
                'Advanced AI models integration',
                '8K video export support',
                'Real-time collaboration tools',
                'Enhanced security protocols',
                'Performance optimizations'
            ]
        };
        return features[this.CONFIG.LATEST_STABLE] || [];
    },
    
    // Get security fixes
    getSecurityFixes(version) {
        return [
            'CVE-2024-001: Input validation vulnerability fixed',
            'CVE-2024-002: Authentication bypass patched',
            'Enhanced encryption for user data',
            'API security improvements'
        ];
    },
    
    // Get upgrade steps
    getUpgradeSteps(currentVersion) {
        return [
            'Backup current projects and settings',
            'Download latest version package',
            'Install security updates',
            'Migrate user preferences',
            'Verify feature compatibility',
            'Complete installation'
        ];
    },
    
    // Version enforcement
    enforceVersionPolicy(currentVersion) {
        const manifest = this.generateUpgradeManifest(currentVersion);
        
        if (manifest.isDeprecated || manifest.forceUpgrade) {
            return {
                allowed: false,
                reason: 'Version no longer supported',
                action: 'FORCE_UPGRADE',
                manifest: manifest
            };
        }
        
        if (this.compareVersions(currentVersion, this.CONFIG.LATEST_STABLE) < 0) {
            return {
                allowed: true,
                reason: 'Update recommended',
                action: 'SUGGEST_UPGRADE',
                manifest: manifest
            };
        }
        
        return {
            allowed: true,
            reason: 'Version current',
            action: 'CONTINUE',
            manifest: manifest
        };
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VersionControl;
} else if (typeof window !== 'undefined') {
    window.VersionControl = VersionControl;
}
