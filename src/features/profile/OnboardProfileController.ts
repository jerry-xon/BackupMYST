
import React from 'react';
import { Platform } from 'react-native';
import { useImagePicker } from 'src/hooks/useImagePicker';
import * as Yup from 'yup';
import json from './config.json';
import {ProgressStatus} from '../../components/common/Progress'
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
type NaviagtionProp = NativeStackNavigationProp<RootStackParamList>;


export const MAX_CATEGORIES_SELECTION = 5
export interface CategoriesProps {
  id:number;
  name:string
}

export type SelectedCategory = Record<string, string>;

export interface FormValues {
  fullName: string;
  username: string;
  email: string;
  dob: string;
}
export const initialValues: FormValues = {
  fullName: '',
  username: '',
  email: '',
  dob: '',
};

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  dob: Yup.string().required('Date of birth is required'),
});

export function useOnboardProfileController() {

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const formikRef = React.useRef<any>(null);

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [status, setStatus] = React.useState<ProgressStatus>('Start');
  const [categories, setCategories] = React.useState<CategoriesProps[]>();
  const [selectedCategories,setSelectedCategories] = React.useState<SelectedCategory>({});
  const [dob, setDob] = React.useState('');

  const navigation = useNavigation<NaviagtionProp>();

  const { image, pickImage, loading } = useImagePicker();

  React.useEffect(()=>{
    setCategories(json.categories.list)
  },[])

  const onSelectCategories = (e: string) => {
    setSelectedCategories((prev) => {
      const updated = { ...prev };
      if (updated.hasOwnProperty(e)) {
        delete updated[e];
      } else {
        if (
          Object.keys(selectedCategories).length < MAX_CATEGORIES_SELECTION
        ) {
          updated[e] = e;
        }
      }
      return updated;
    });
  };
  
  const handleDateChange = (
    event: any,
    selectedDate?: Date,
    onSelect?: (formattedDate: string) => void,
    onBlur?: () => void
  ) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
      if (onSelect) onSelect(formattedDate);
      if (onBlur) onBlur();
    }
  };

  const onSubmit = (values:FormValues)=>{
    setStatus('In-progress')
  }

  const handleSheetChanges = React.useCallback((index: number) => {
        setShowDatePicker(index === -1 ? false : true)
    }, []);


    const onShowPicker = ()=>{
      if(Platform.OS === 'ios') {
        bottomSheetRef.current?.expand();
        setShowDatePicker(true);
      }else{
        setShowDatePicker(true);
      }
    }


  return {
    bottomSheetRef,
    formikRef,
    selectedCategories,
    categories,
    dob,
    status,
    image,
    pickImage,
    loading,
    setDob,
    setStatus,
    showDatePicker,
    setShowDatePicker,
    handleDateChange,
    onSubmit,
    onSelectCategories,
    handleSheetChanges,
    onShowPicker,
    navigation
  };
}