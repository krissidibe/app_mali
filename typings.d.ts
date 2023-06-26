 
export type Competition = {
  id: number;
  title: String;

  statut: string;
  startDateAt: DateTime;
  endDateAt: DateTime;

  content: string;
  image: string;
  ageMin: string;
  ageMax: string;
};


type Board = {
  
  titre: String;
}