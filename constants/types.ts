export type OAuthTokenResponse = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  secret_valid_until: number;
  token_type: string;
};

export type ApiError = { error: string | null; message: string | null };

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

type Language = {
  id: number;
  name: string;
  identifier: string;
  created_at: string;
  updated_at: string;
};

type Campus = {
  id: number;
  city: string;
};

export type User = {
  id: number;
  email: string;
  login: string;
  last_name: string;
  usual_full_name: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  correction_point: number;
  wallet: number;
  projects_users: ProjectUser[];
  campus: Campus[];
  cursus_users: CursusUser[];
};

export type SearchUserType = {
  id: number;
  fullName: string;
  login: string;
  image: string | undefined;
};

export type ProfileType = {
  id: number;
  image: string | undefined;
  fullName: string;
  login: string;
  wallet: number;
  correction_point: number;
  city: string;
  cursusList: CursusUser[] | [];
  projects: ProjectUser[] | [];
};
