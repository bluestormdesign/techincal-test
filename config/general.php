<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'cpTrigger' => 'bscp',
        'securityKey' => getenv('SECURITY_KEY'),
        'useProjectConfigFile' => false,
        'devMode' => true,
        'enableTemplateCaching' => false,
        'defaultTemplateExtensions' => ['twig', 'html'],
        'maxUploadFileSize' => 41943040, // 40 MB
        'enableCsrfProtection' => true,
        'siteUrl' => getenv('CRAFT_SITE_URL'),
        'cacheMethod' => getenv('CRAFT_CACHE_METHOD'),
        'allowUpdates' => true,
        'defaultSearchTermOptions' => [
            'subLeft' => true,
            'subRight' => true,
        ],
        'imageDriver' => 'gd'

    ],

    // Production environment settings
    'production' => [
        'allowAdminChanges' => true,
        'devMode' => false,
        'enableTemplateCaching' => true,
        'sendPoweredByHeader' => false,
        'phpMaxMemoryLimit' => '512M'
    ],
];
