
import {gql} from "@apollo/client"

export const GET_ALL_MOVIES = gql`
query{
  movies{
    name
    genre
 directors{
  name
}
  }
}
`