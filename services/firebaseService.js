import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

//Fetch onboarding configuration
export const fetchOnboardingConfig = async () => {
    try {
      console.log('Fetching onboarding configuration...');
      const docSnap = await getDoc(doc(db, 'admin', 'config'));
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Raw configuration from Firestore:', data);
  
        const steps = [
          {
            name: 'Step 2',
            components: Object.keys(data.step2).filter((key) => data.step2[key]),
          },
          {
            name: 'Step 3',
            components: Object.keys(data.step3).filter((key) => data.step3[key]),
          },
        ];
  
        console.log('Transformed steps:', steps);
        return steps;
      } else {
        console.log('No onboarding configuration found.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching onboarding configuration:', error);
      return [];
    }
  };

// Save onboarding configuration
export const saveOnboardingConfig = async (config) => {
  try {
    await setDoc(doc(db, 'admin', 'config'), config);
    console.log('Configuration saved successfully!');
  } catch (error) {
    console.error('Error saving configuration:', error);
  }
};

  // Save user profile
  export const saveUserProfile = async (userId, profileData) => {
    try {
      await setDoc(doc(db, 'users', userId), profileData, { merge: true });
      console.log('User profile saved successfully!');
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

// Fetch user profile
export const fetchUserProfile = async (userId) => {
    try {
      const docSnap = await getDoc(doc(db, 'users', userId));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No user profile found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };