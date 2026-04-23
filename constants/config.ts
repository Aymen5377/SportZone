// SportZone Configuration

export const config = {
  appName: 'SportZone',
  appTagline: 'بث رياضي مباشر',
  version: '1.0.0',
  
  // Match status
  matchStatus: {
    LIVE: 'مباشر',
    UPCOMING: 'قادمة',
    FINISHED: 'انتهت',
    HALFTIME: 'استراحة',
    POSTPONED: 'مؤجلة',
  },
  
  // League names
  leagues: {
    PREMIER: 'الدوري الإنجليزي',
    LALIGA: 'الدوري الإسباني',
    SERIEA: 'الدوري الإيطالي',
    BUNDESLIGA: 'الدوري الألماني',
    LIGUE1: 'الدوري الفرنسي',
    UCL: 'دوري أبطال أوروبا',
    UEL: 'الدوري الأوروبي',
    WORLDCUP: 'كأس العالم',
    ARAB: 'الدوري السعودي',
  },
  
  // Channel categories
  channelCategories: {
    ALL: 'الكل',
    BEIN: 'beIN Sports',
    SSC: 'SSC',
    OTHER: 'قنوات أخرى',
  },
};
