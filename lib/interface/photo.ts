export interface Photo {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  dir: string;
  path: string;
  public: string | null;
  alt: string | null;
}
