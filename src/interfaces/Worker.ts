import { Email } from 'types/Email';
import { Gender } from 'types/Gender';

export default interface Worker {
  age: number;
  country: string;
  email: Email;
  favorite: {
    color: string;
    food: string;
    random_string: string;
    song: string;
  };
  first_name: string;
  gender: Gender;
  height: number;
  id: number;
  image: string;
  last_name: string;
  profession: string;
}