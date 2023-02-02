interface ICreateRentalDTO {
  id?: string;
  car_id: string;
  user_id: string;
  start_date?: Date;
  end_date?: Date;
  expected_return_date: Date;
  total?: number;
}

export { ICreateRentalDTO };
