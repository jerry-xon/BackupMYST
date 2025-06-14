import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer';
import { spacing } from 'src/constants';
import Progress from 'src/components/common/Progress';
import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';
import User from '@assets/icons/svg/User.svg';
import Email from '@assets/icons/svg/Email.svg';
import DOB from '@assets/icons/svg/DOB.svg';
import InputBox from 'src/components/common/InputBox';
import RNButton from 'src/components/common/RNButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';


import {
  useOnboardProfileController,
  validationSchema,
  initialValues,
  MAX_CATEGORIES_SELECTION,
} from './OnboardProfileController';
import json from './config.json'
import GradientViewText from 'src/components/common/GradientViewText';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeOut } from 'react-native-reanimated';
import UserImage from 'src/components/common/UserImage';

const OnboardProfile = () => {
  
  const {
    bottomSheetRef,
    formikRef,
    categories,
    selectedCategories,
    status,
    setStatus,
    image,
    pickImage,
    dob,
    setDob,
    showDatePicker,
    setShowDatePicker,
    handleDateChange,
    onSubmit,
    onSelectCategories,
    handleSheetChanges,
    onShowPicker,
    navigation
  } = useOnboardProfileController();

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
      isFirstRender.current = true;
  }, [status]);

  const max = MAX_CATEGORIES_SELECTION - Object.keys(selectedCategories).length;

  const dobPicker = ()=>{
    if(Platform.OS === 'ios'){
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['30%']}
        index={-1}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.darkBlue }} 
        handleIndicatorStyle={{ backgroundColor: 'gray' }} 
      >
        <BottomSheetView style={styles.contentContainer}>
          <DateTimePicker
            value={dob ? new Date(dob) : new Date()}
            mode="date"
            display={'spinner'}
            onChange={(e, date) => {
              handleDateChange(e, date, (e) =>
                formikRef.current?.setFieldValue('dob', e)
              );
            }}
            maximumDate={new Date()}
            themeVariant="dark"
            style={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: colors.darkBlue,
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    )
  }
  else{
    return (
      showDatePicker && (
        <DateTimePicker
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
          onChange={(e, date) => {
            setShowDatePicker(false)
            handleDateChange(e, date, (e) =>
              formikRef.current?.setFieldValue('dob', e)
            );
          }}
          maximumDate={new Date()}
          themeVariant="dark"
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: colors.darkBlue,
          }}
        />
      )
    );
  }
  }

  const profile = () => {
    return (
      <React.Fragment>
        <Animated.Text entering={FadeInLeft.delay(200)} style={styles.title}>
          {json[status !== 'Start' ? 'categories' : 'profile'].title}
        </Animated.Text>

        <Animated.Text
          key={status}
          entering={FadeInLeft.delay(200)}
          style={styles.description}
        >
          {json.profile.descrption}
        </Animated.Text>

        <Animated.View
          style={styles.profileContainer}
          entering={FadeInLeft.delay(100)}
        >
          <UserImage
            source={
              image?.uri
                ? { uri: image.uri }
                : require('../../../assets/icons/user.png')
            }
            action="Edit"
            onChangeImage={pickImage}
            gradientStatus='Blue'
            height={100}
          />
        </Animated.View>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => (
            <>
              <InputBox
                entering={FadeInDown.delay(100)}
                title="Full Name"
                rightIcon={<User />}
                inputValue={values.fullName}
                onWriteText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={touched.fullName ? errors.fullName : undefined}
              />

              <InputBox
                entering={FadeInDown.delay(200)}
                title="Username"
                rightIcon={<User />}
                onWriteText={handleChange('username')}
                onBlur={handleBlur('username')}
                inputValue={values.username}
                error={touched.username ? errors.username : undefined}
              />

              <InputBox
                entering={FadeInDown.delay(300)}
                title="Email address"
                inputValue={values.email}
                rightIcon={<Email />}
                onWriteText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email ? errors.email : undefined}
              />

              <Pressable
                onPress={() => {
                  onShowPicker();
                  setFieldTouched('dob', true);
                }}
                style={{ marginBottom: 12 }}
              >
                <InputBox
                  entering={FadeInDown.delay(400)}
                  title="Date of Birth"
                  editable={false}
                  rightIcon={<DOB />}
                  inputValue={values.dob}
                  pointerEvents="none"
                  error={touched.dob ? errors.dob : undefined}
                />
              </Pressable>

              <View style={styles.secondColumn}>
                <RNButton
                  key={'continues'}
                  active={true}
                  title="continue"
                  onPress={() => setStatus('In-progress')}
                />
              </View>
            </>
          )}
        </Formik>
      </React.Fragment>
    );
  };

  const categoriesView = () => {
    return (
      <>
        <Animated.Text
          entering={FadeInLeft.delay(200)}
          style={styles.title}
        >
          {json[status !== 'Start' ? 'categories' : 'profile'].title}
        </Animated.Text>

        <Animated.Text
          style={styles.description}
          entering={FadeInLeft.delay(250)}
        >
          Select <Text style={styles.bold}>{`${max} or more`}</Text> categories
        </Animated.Text>

        <View style={styles.categoriesContainer}>
          <View style={styles.categorisWrapper}>
            {categories?.map((i, index) =>{
               const delay = isFirstRender.current
                 ? FadeInDown.delay(30 * index)
                 : undefined;
              return (
                <GradientViewText
                  key={i.name}
                  active={selectedCategories.hasOwnProperty(i.name)}
                  onSelect={() => onSelectCategories(i.name)}
                  entering={delay}
                >
                  <Animated.Text
                    style={[
                      styles.description,
                      {
                        fontSize: 14,
                        fontFamily: selectedCategories.hasOwnProperty(i.name)
                          ? fontFamily.medium
                          : fontFamily.medium,
                      },
                    ]}
                  >
                    {i.name}
                  </Animated.Text>
                </GradientViewText>
              );
            })}
          </View>
          <View style={styles.secondColumn}>
            <View style={styles.rowOfbutton}>
              <RNButton
                key={'back'}
                mainContainer={{ flex: 1 }}
                active={false}
                title="BACK"
                onPress={() => setStatus('Start')}
              />
              <RNButton
                key={'continue'}
                mainContainer={{ flex: 1 }}
                active={true}
                deactived={
                  Object.keys(selectedCategories).length !==
                  MAX_CATEGORIES_SELECTION
                }
                title={`CONTINUE`}
                onPress={() => {
                  setStatus('End');
                  navigation.navigate('Tabs')
                }}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBackgroundLayer scroll={true}>
        <View style={styles.container}>
          <View style={styles.splitContainers}>
            <Progress status={status} />
            {status === 'Start' ? (
              <Animated.View
                key="profile"
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={{ flex: 1 }}
              >
                {profile()}
              </Animated.View>
            ) : (
              <Animated.View
                key="categories"
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={{ flex: 1 }}
              >
                {categoriesView()}
              </Animated.View>
            )}
          </View>
        </View>
      </AppBackgroundLayer>
      <Pressable
        style={{
          display: showDatePicker ? 'flex' : 'none',
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: colors.blurBorderColor,
        }}
        onPress={() => {}}
      />
      { dobPicker()}
    </View>
  );
};

export default OnboardProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  splitContainers: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 80,
  },
  firstColumn: {
    flex: 1,
  },
  secondColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: Platform.OS === 'android' ? 60 : 40,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 24 * 1.6,
    letterSpacing: 0,
    color: colors.white,
    marginTop: 32,
    maxWidth: '85%',
  },
  description: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    lineHeight: 14 * 1.6,
    letterSpacing: 0,
    color: colors.white,
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.white,
  },
  profileContainer: {
    marginVertical: 40,
    alignSelf: 'center',
  },
  imageContainer: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 120,
  },
  image: {
    height: '100%',
    width: '100%',
  },
 
  modalContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.blurBorderColor,
  },
  categoriesContainer: {
    marginTop: 40,
    flex: 1,
  },
  categorisWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
  },
  rowOfbutton: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    zIndex: 9999,
    elevation: 9999, // Android specific
    backgroundColor: colors.darkBlue
  },
});
