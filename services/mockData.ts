// bein Connect Mock Data

export interface Channel {
  id: string;
  name: string;
  category: string;
  logo: string;
  streamUrl: string;
  isLive: boolean;
  currentShow: string;
  quality: string;
  isFavorite: boolean;
  viewers: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  country: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: 'live' | 'upcoming' | 'finished' | 'halftime';
  minute: string;
  league: string;
  leagueId: string;
  startTime: string;
  date: string;
  channelId: string;
  channelName: string;
  isFavorite: boolean;
  events: MatchEvent[];
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow' | 'red' | 'substitution' | 'penalty';
  minute: string;
  player: string;
  team: 'home' | 'away';
}

export interface League {
  id: string;
  name: string;
  logo: string;
  country: string;
  color: string;
}

// Teams
export const teams: Team[] = [
  { id: 't1', name: 'ريال مدريد', shortName: 'RMA', logo: '⚪', country: 'إسبانيا' },
  { id: 't2', name: 'برشلونة', shortName: 'BAR', logo: '🔵', country: 'إسبانيا' },
  { id: 't3', name: 'مانشستر سيتي', shortName: 'MCI', logo: '🔵', country: 'إنجلترا' },
  { id: 't4', name: 'ليفربول', shortName: 'LIV', logo: '🔴', country: 'إنجلترا' },
  { id: 't5', name: 'بايرن ميونخ', shortName: 'BAY', logo: '🔴', country: 'ألمانيا' },
  { id: 't6', name: 'باريس سان جيرمان', shortName: 'PSG', logo: '🔵', country: 'فرنسا' },
  { id: 't7', name: 'يوفنتوس', shortName: 'JUV', logo: '⚪', country: 'إيطاليا' },
  { id: 't8', name: 'إنتر ميلان', shortName: 'INT', logo: '🔵', country: 'إيطاليا' },
  { id: 't9', name: 'أرسنال', shortName: 'ARS', logo: '🔴', country: 'إنجلترا' },
  { id: 't10', name: 'تشيلسي', shortName: 'CHE', logo: '🔵', country: 'إنجلترا' },
  { id: 't11', name: 'أتلتيكو مدريد', shortName: 'ATM', logo: '🔴', country: 'إسبانيا' },
  { id: 't12', name: 'دورتموند', shortName: 'BVB', logo: '🟡', country: 'ألمانيا' },
  { id: 't13', name: 'الهلال', shortName: 'HIL', logo: '🔵', country: 'السعودية' },
  { id: 't14', name: 'النصر', shortName: 'NAS', logo: '🟡', country: 'السعودية' },
  { id: 't15', name: 'الأهلي', shortName: 'AHL', logo: '🟢', country: 'السعودية' },
  { id: 't16', name: 'الاتحاد', shortName: 'ITH', logo: '🟡', country: 'السعودية' },
  { id: 't17', name: 'مانشستر يونايتد', shortName: 'MUN', logo: '🔴', country: 'إنجلترا' },
  { id: 't18', name: 'ميلان', shortName: 'MIL', logo: '🔴', country: 'إيطاليا' },
  { id: 't19', name: 'نابولي', shortName: 'NAP', logo: '🔵', country: 'إيطاليا' },
  { id: 't20', name: 'توتنهام', shortName: 'TOT', logo: '⚪', country: 'إنجلترا' },
];

// Leagues
export const leagues: League[] = [
  { id: 'pl', name: 'الدوري الإنجليزي', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'إنجلترا', color: '#3D195B' },
  { id: 'll', name: 'الدوري الإسباني', logo: '🇪🇸', country: 'إسبانيا', color: '#FF4B44' },
  { id: 'sa', name: 'الدوري الإيطالي', logo: '🇮🇹', country: 'إيطاليا', color: '#008FD7' },
  { id: 'bl', name: 'الدوري الألماني', logo: '🇩🇪', country: 'ألمانيا', color: '#D20515' },
  { id: 'l1', name: 'الدوري الفرنسي', logo: '🇫🇷', country: 'فرنسا', color: '#DDE51C' },
  { id: 'ucl', name: 'دوري الأبطال', logo: '🏆', country: 'أوروبا', color: '#00235A' },
  { id: 'rsl', name: 'الدوري السعودي', logo: '🇸🇦', country: 'السعودية', color: '#006233' },
];

// Channels
export const channels: Channel[] = [
  { id: 'c1', name: 'beIN Sports 1', category: 'BEIN', logo: '', streamUrl: 'http://103.205.17.67:8080/live/92164982129771/47825113539654/66.ts', isLive: true, currentShow: 'الدوري الإنجليزي - مباشر', quality: 'HD', isFavorite: false, viewers: 45200 },
  { id: 'c2', name: 'beIN Sports 2', category: 'BEIN', logo: '', streamUrl: '', isLive: true, currentShow: 'الدوري الإسباني - مباشر', quality: 'HD', isFavorite: false, viewers: 38400 },
  { id: 'c3', name: 'beIN Sports 3', category: 'BEIN', logo: '', streamUrl: '', isLive: false, currentShow: 'استوديو التحليل', quality: 'HD', isFavorite: false, viewers: 12300 },
  { id: 'c4', name: 'beIN Sports 4', category: 'BEIN', logo: '', streamUrl: '', isLive: true, currentShow: 'دوري أبطال أوروبا', quality: 'HD', isFavorite: false, viewers: 67800 },
  { id: 'c5', name: 'beIN Sports 5', category: 'BEIN', logo: '', streamUrl: '', isLive: false, currentShow: 'ملخصات المباريات', quality: 'HD', isFavorite: false, viewers: 8900 },
  { id: 'c6', name: 'beIN Sports Premium 1', category: 'BEIN', logo: '', streamUrl: '', isLive: true, currentShow: 'الدوري الفرنسي', quality: 'FHD', isFavorite: false, viewers: 29100 },
  { id: 'c7', name: 'beIN Sports Premium 2', category: 'BEIN', logo: '', streamUrl: '', isLive: false, currentShow: 'أخبار الرياضة', quality: 'FHD', isFavorite: false, viewers: 5600 },
  { id: 'c8', name: 'SSC 1', category: 'SSC', logo: '', streamUrl: '', isLive: true, currentShow: 'الدوري السعودي - مباشر', quality: 'HD', isFavorite: false, viewers: 52000 },
  { id: 'c9', name: 'SSC 2', category: 'SSC', logo: '', streamUrl: '', isLive: true, currentShow: 'كأس الملك', quality: 'HD', isFavorite: false, viewers: 41200 },
  { id: 'c10', name: 'SSC 3', category: 'SSC', logo: '', streamUrl: '', isLive: false, currentShow: 'برنامج رياضي', quality: 'HD', isFavorite: false, viewers: 7800 },
  { id: 'c11', name: 'SSC 4', category: 'SSC', logo: '', streamUrl: '', isLive: false, currentShow: 'ملخصات وأهداف', quality: 'HD', isFavorite: false, viewers: 15400 },
  { id: 'c12', name: 'SSC 5', category: 'SSC', logo: '', streamUrl: '', isLive: true, currentShow: 'دوري يلو - مباشر', quality: 'HD', isFavorite: false, viewers: 18900 },
  { id: 'c13', name: 'Abu Dhabi Sports 1', category: 'OTHER', logo: '', streamUrl: '', isLive: true, currentShow: 'دوري أدنوك', quality: 'HD', isFavorite: false, viewers: 22100 },
  { id: 'c14', name: 'Dubai Sports', category: 'OTHER', logo: '', streamUrl: '', isLive: false, currentShow: 'نشرة رياضية', quality: 'HD', isFavorite: false, viewers: 9200 },
  { id: 'c15', name: 'MBC Sport', category: 'OTHER', logo: '', streamUrl: '', isLive: true, currentShow: 'كرة قدم مباشر', quality: 'HD', isFavorite: false, viewers: 31500 },
  { id: 'c16', name: 'beIN Sports 6', category: 'BEIN', logo: '', streamUrl: '', isLive: false, currentShow: 'الدوري الألماني - إعادة', quality: 'HD', isFavorite: false, viewers: 6300 },
  { id: 'c17', name: 'beIN Sports 7', category: 'BEIN', logo: '', streamUrl: '', isLive: true, currentShow: 'الدوري الإيطالي', quality: 'HD', isFavorite: false, viewers: 27600 },
  { id: 'c18', name: 'SSC Extra 1', category: 'SSC', logo: '', streamUrl: '', isLive: false, currentShow: 'تغطية خاصة', quality: 'HD', isFavorite: false, viewers: 4100 },
  { id: 'c19', name: 'beIN Sports Xtra', category: 'BEIN', logo: '', streamUrl: '', isLive: true, currentShow: 'أخبار رياضية', quality: 'SD', isFavorite: false, viewers: 19800 },
  { id: 'c20', name: 'SSC Sport', category: 'SSC', logo: '', streamUrl: '', isLive: false, currentShow: 'استوديو تحليلي', quality: 'HD', isFavorite: false, viewers: 11200 },
  { id: 'c21', name: 'Al Kass Sports 1', category: 'OTHER', logo: '', streamUrl: '', isLive: true, currentShow: 'دوري نجوم قطر', quality: 'HD', isFavorite: false, viewers: 14600 },
  { id: 'c22', name: 'beIN Sports 8', category: 'BEIN', logo: '', streamUrl: '', isLive: false, currentShow: 'كأس أوروبا - إعادة', quality: 'HD', isFavorite: false, viewers: 8700 },
];

// Matches
export const matches: Match[] = [
  {
    id: 'm1', homeTeam: teams[2], awayTeam: teams[3], homeScore: 2, awayScore: 1,
    status: 'live', minute: "67'", league: 'الدوري الإنجليزي', leagueId: 'pl',
    startTime: '21:00', date: 'اليوم', channelId: 'c1', channelName: 'beIN Sports 1',
    isFavorite: true,
    events: [
      { id: 'e1', type: 'goal', minute: "12'", player: 'هالاند', team: 'home' },
      { id: 'e2', type: 'goal', minute: "34'", player: 'صلاح', team: 'away' },
      { id: 'e3', type: 'yellow', minute: "45'", player: 'رودري', team: 'home' },
      { id: 'e4', type: 'goal', minute: "58'", player: 'دي بروين', team: 'home' },
    ],
  },
  {
    id: 'm2', homeTeam: teams[0], awayTeam: teams[1], homeScore: 0, awayScore: 0,
    status: 'live', minute: "23'", league: 'الدوري الإسباني', leagueId: 'll',
    startTime: '22:00', date: 'اليوم', channelId: 'c2', channelName: 'beIN Sports 2',
    isFavorite: true,
    events: [
      { id: 'e5', type: 'yellow', minute: "18'", player: 'كروس', team: 'home' },
    ],
  },
  {
    id: 'm3', homeTeam: teams[4], awayTeam: teams[11], homeScore: 3, awayScore: 2,
    status: 'halftime', minute: "HT", league: 'الدوري الألماني', leagueId: 'bl',
    startTime: '19:30', date: 'اليوم', channelId: 'c17', channelName: 'beIN Sports 7',
    isFavorite: false,
    events: [
      { id: 'e6', type: 'goal', minute: "5'", player: 'ساني', team: 'home' },
      { id: 'e7', type: 'goal', minute: "15'", player: 'فولكروج', team: 'away' },
      { id: 'e8', type: 'goal', minute: "22'", player: 'مولر', team: 'home' },
      { id: 'e9', type: 'goal', minute: "30'", player: 'أديمي', team: 'away' },
      { id: 'e10', type: 'goal', minute: "41'", player: 'كين', team: 'home' },
      { id: 'e11', type: 'red', minute: "44'", player: 'هاميلز', team: 'away' },
    ],
  },
  {
    id: 'm4', homeTeam: teams[5], awayTeam: teams[18], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري الفرنسي', leagueId: 'l1',
    startTime: '23:00', date: 'اليوم', channelId: 'c6', channelName: 'beIN Premium 1',
    isFavorite: false, events: [],
  },
  {
    id: 'm5', homeTeam: teams[7], awayTeam: teams[6], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري الإيطالي', leagueId: 'sa',
    startTime: '21:45', date: 'اليوم', channelId: 'c4', channelName: 'beIN Sports 4',
    isFavorite: false, events: [],
  },
  {
    id: 'm6', homeTeam: teams[8], awayTeam: teams[9], homeScore: 1, awayScore: 0,
    status: 'live', minute: "78'", league: 'الدوري الإنجليزي', leagueId: 'pl',
    startTime: '20:00', date: 'اليوم', channelId: 'c15', channelName: 'MBC Sport',
    isFavorite: false,
    events: [
      { id: 'e12', type: 'goal', minute: "55'", player: 'ساكا', team: 'home' },
      { id: 'e13', type: 'yellow', minute: "62'", player: 'كايسيدو', team: 'away' },
    ],
  },
  {
    id: 'm7', homeTeam: teams[12], awayTeam: teams[13], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري السعودي', leagueId: 'rsl',
    startTime: '20:30', date: 'غداً', channelId: 'c8', channelName: 'SSC 1',
    isFavorite: true, events: [],
  },
  {
    id: 'm8', homeTeam: teams[14], awayTeam: teams[15], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري السعودي', leagueId: 'rsl',
    startTime: '18:00', date: 'غداً', channelId: 'c9', channelName: 'SSC 2',
    isFavorite: false, events: [],
  },
  {
    id: 'm9', homeTeam: teams[16], awayTeam: teams[19], homeScore: 2, awayScore: 2,
    status: 'finished', minute: "FT", league: 'الدوري الإنجليزي', leagueId: 'pl',
    startTime: '17:00', date: 'اليوم', channelId: 'c1', channelName: 'beIN Sports 1',
    isFavorite: false,
    events: [
      { id: 'e14', type: 'goal', minute: "20'", player: 'راشفورد', team: 'home' },
      { id: 'e15', type: 'goal', minute: "35'", player: 'سون', team: 'away' },
      { id: 'e16', type: 'goal', minute: "55'", player: 'هوجبيرغ', team: 'away' },
      { id: 'e17', type: 'goal', minute: "88'", player: 'برونو', team: 'home' },
    ],
  },
  {
    id: 'm10', homeTeam: teams[17], awayTeam: teams[7], homeScore: 1, awayScore: 3,
    status: 'finished', minute: "FT", league: 'الدوري الإيطالي', leagueId: 'sa',
    startTime: '18:45', date: 'أمس', channelId: 'c4', channelName: 'beIN Sports 4',
    isFavorite: false,
    events: [
      { id: 'e18', type: 'goal', minute: "10'", player: 'ليون', team: 'home' },
      { id: 'e19', type: 'goal', minute: "33'", player: 'لاوتارو', team: 'away' },
      { id: 'e20', type: 'goal', minute: "60'", player: 'بارليا', team: 'away' },
      { id: 'e21', type: 'goal', minute: "75'", player: 'ثورام', team: 'away' },
    ],
  },
  {
    id: 'm11', homeTeam: teams[0], awayTeam: teams[4], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'دوري الأبطال', leagueId: 'ucl',
    startTime: '22:00', date: 'الأربعاء', channelId: 'c4', channelName: 'beIN Sports 4',
    isFavorite: true, events: [],
  },
  {
    id: 'm12', homeTeam: teams[2], awayTeam: teams[5], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'دوري الأبطال', leagueId: 'ucl',
    startTime: '22:00', date: 'الأربعاء', channelId: 'c1', channelName: 'beIN Sports 1',
    isFavorite: false, events: [],
  },
  {
    id: 'm13', homeTeam: teams[1], awayTeam: teams[10], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري الإسباني', leagueId: 'll',
    startTime: '21:00', date: 'السبت', channelId: 'c2', channelName: 'beIN Sports 2',
    isFavorite: false, events: [],
  },
  {
    id: 'm14', homeTeam: teams[3], awayTeam: teams[8], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري الإنجليزي', leagueId: 'pl',
    startTime: '18:30', date: 'السبت', channelId: 'c1', channelName: 'beIN Sports 1',
    isFavorite: false, events: [],
  },
];
