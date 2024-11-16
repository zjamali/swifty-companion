export type OAuthTokenResponse = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  secret_valid_until: number;
  token_type: string;
};

type CustomHeaders = {
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
  };
};

export type FetchOptionsType = RequestInit & CustomHeaders;

type ImageVersions = {
  large: string;
  medium: string;
  small: string;
  micro: string;
};

type Image = {
  link: string;
  versions: ImageVersions;
};

type Skill = {
  id: number;
  name: string;
  level: number;
};

type Cursus = {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  kind: string;
};

export type CursusUser = {
  grade: string | null;
  level: number;
  skills: Skill[];
  blackholed_at: string | null;
  id: number;
  begin_at: string;
  end_at: string;
  cursus_id: number;
  has_coalition: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  cursus: Cursus;
};

type Project = {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
};

export type ProjectUser = {
  id: number;
  occurrence: number;
  final_mark: number | null;
  status: string;
  "validated?": boolean | null;
  current_team_id: number;
  project: Project;
  cursus_ids: number[];
  marked_at: string | null;
  marked: boolean;
  retriable_at: string | null;
  created_at: string;
  updated_at: string;
};

type LanguageUser = {
  id: number;
  language_id: number;
  user_id: number;
  position: number;
  created_at: string;
};

type Achievement = {
  id: number;
  name: string;
  description: string;
  tier: string;
  kind: string;
  visible: boolean;
  image: string;
  nbr_of_success: number | null;
  users_url: string;
};

type Title = {
  id: number;
  name: string;
};

type TitleUser = {
  id: number;
  user_id: number;
  title_id: number;
  selected: boolean;
  created_at: string;
  updated_at: string;
};

type Language = {
  id: number;
  name: string;
  identifier: string;
  created_at: string;
  updated_at: string;
};

type Campus = {
  id: number;
  name: string;
  time_zone: string;
  language: Language;
  users_count: number;
  vogsphere_id: number;
  country: string;
  address: string;
  zip: string;
  city: string;
  website: string;
  facebook: string;
  twitter: string;
  active: boolean;
  public: boolean;
  email_extension: string;
  default_hidden_phone: boolean;
};

type CampusUser = {
  id: number;
  user_id: number;
  campus_id: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string | null;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  "staff?": boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: string | null;
  "alumni?": boolean;
  "active?": boolean;
  projects_users: ProjectUser[];
  languages_users: LanguageUser[];
  achievements: Achievement[];
  titles: Title[];
  titles_users: TitleUser[];
  partnerships: any[];
  patroned: any[];
  patroning: any[];
  expertises_users: any[];
  roles: any[];
  campus: Campus[];
  campus_users: CampusUser[];
  cursus_users: CursusUser[];
};
