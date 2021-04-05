import CategoriesActionTypes from './categories.type';
import { ListToTree } from './categories.utils';

const INITIAL_STATE = {
  categories: null,
  isFetching: true,
  isLoaded: false,
  errorMessage: undefined
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isFetching: true
      };
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        categories: ListToTree(action.payload)
      };
    case CategoriesActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case CategoriesActionTypes.FETCH_CATEGORIES_OFFLINE:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        categories: ListToTree(action.payload)
      }
    default:
      return state;
  }
};

export default categoriesReducer;