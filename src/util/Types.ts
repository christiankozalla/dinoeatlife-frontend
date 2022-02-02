export interface Recipe {
  id?: string;
  name: string;
  body: string;
  ingredients: [string, string][];
}
