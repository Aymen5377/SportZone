// SportZone - Mock Data (Fixed & Updated 2026-04-23)

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
  { id: 't13', name: 'الهلال', shortName: 'HIL', logo: '🔵', country: 'السعودية' },
  { id: 't14', name: 'النصر', shortName: 'NAS', logo: '🟡', country: 'السعودية' },
];

// Leagues
export const leagues: League[] = [
  { id: 'pl', name: 'الدوري الإنجليزي', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'إنجلترا', color: '#3D195B' },
  { id: 'll', name: 'الدوري الإسباني', logo: '🇪🇸', country: 'إسبانيا', color: '#FF4B44' },
  { id: 'rsl', name: 'الدوري السعودي', logo: '🇸🇦', country: 'السعودية', color: '#006233' },
];

// Channels - تم إصلاح الروابط هنا لتكون m3u8
export const channels: Channel[] = [
  { id: 'c1', name: 'beIN Sports 1', category: 'BEIN', logo: '', streamUrl: 'http://103.205.17.67:8080/live/92164982129771/47825113539654/66.m3u8', isLive: true, currentShow: 'الدوري الإنجليزي - مباشر', quality: 'HD', isFavorite: true, viewers: 45200 },
  { id: 'c2', name: 'beIN Sports 2', category: 'BEIN', logo: '', streamUrl: 'http://103.205.17.67:8080/live/92164982129771/47825113539654/65.m3u8', isLive: true, currentShow: 'الدوري الإسباني - مباشر', quality: 'HD', isFavorite: false, viewers: 38400 },
  { id: 'c3', name: 'beIN Sports 3', category: 'BEIN', logo: '', streamUrl: 'http://103.205.17.67:8080/live/92164982129771/47825113539654/64.m3u8', isLive: true, currentShow: 'الدوري الفرنسي - مباشر', quality: 'HD', isFavorite: false, viewers: 22300 },
  { id: 'c4', name: 'beIN Sports 4', category: 'BEIN', logo: '', streamUrl: '', isLive: false, currentShow: 'استوديو التحليل', quality: 'HD', isFavorite: false, viewers: 67800 },
  { id: 'c8', name: 'SSC 1', category: 'SSC', logo: '', streamUrl: '', isLive: true, currentShow: 'الدوري السعودي - مباشر', quality: 'HD', isFavorite: false, viewers: 52000 },
];

// Matches - تم تحديث المواعيد لتتوافق مع تاريخ اليوم 23-04-2026
export const matches: Match[] = [
  {
    id: 'm1', homeTeam: teams[2], awayTeam: teams[3], homeScore: 1, awayScore: 0,
    status: 'live', minute: "25'", league: 'الدوري الإنجليزي', leagueId: 'pl',
    startTime: '15:30', date: 'اليوم', channelId: 'c1', channelName: 'beIN Sports 1',
    isFavorite: true,
    events: [
      { id: 'e1', type: 'goal', minute: "12'", player: 'هالاند', team: 'home' },
    ],
  },
  {
    id: 'm2', homeTeam: teams[0], awayTeam: teams[1], homeScore: null, awayScore: null,
    status: 'live', minute: "10'", league: 'الدوري الإسباني', leagueId: 'll',
    startTime: '16:00', date: 'اليوم', channelId: 'c2', channelName: 'beIN Sports 2',
    isFavorite: true,
    events: [],
  },
  {
    id: 'm3', homeTeam: teams[13], awayTeam: teams[12], homeScore: null, awayScore: null,
    status: 'upcoming', minute: '', league: 'الدوري السعودي', leagueId: 'rsl',
    startTime: '21:00', date: 'اليوم', channelId: 'c8', channelName: 'SSC 1',
    isFavorite: true, events: [],
  },
];
   
