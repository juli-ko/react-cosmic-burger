import { createSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch } from '../services/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector = createSelectorHook();
