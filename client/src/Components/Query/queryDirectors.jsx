
import {gql} from "@apollo/client"

export const GET_ALL_DIRECTORS = gql`
query{
 directors{
  name
  age
}
}
`