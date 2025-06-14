// import { useEffect, useState } from 'react';
// import { Alert, Platform } from 'react-native';
// import {
//   check,
//   checkMultiple,
//   openSettings,
//   request,
//   requestMultiple,
//   RESULTS,
//   Permission,
//   PermissionStatus,
// } from 'react-native-permissions';

// type UsePermissionsReturn = {
//   statusMap: Record<string, PermissionStatus>;
//   isGranted: boolean;
//   isDenied: boolean;
//   isBlocked: boolean;
//   isLimited: boolean;
//   checkAndRequest: () => Promise<void>;
//   openAppSettings: () => void;
// };

// export default function usePermissions(
//   permissions: Permission[] | Permission
// ): UsePermissionsReturn {
//   const [statusMap, setStatusMap] = useState<Record<string, PermissionStatus>>(
//     {}
//   );
//   const [hasRequested, setHasRequested] = useState(false);

//   useEffect(() => {
//     checkAndRequest();
//   }, []);

//   const showBlockedAlert = () => {
//     Alert.alert(
//       'Permission Blocked',
//       'Permission has been blocked. Please enable it from settings to continue.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Open Settings',
//           onPress: () => {
//             openSettings().catch(() =>
//               console.warn('Unable to open app settings')
//             );
//           },
//         },
//       ]
//     );
//   };

//   const checkAndRequest = async () => {
//     try {
//       const perms = Array.isArray(permissions) ? permissions : [permissions];
//       let currentStatuses = await checkMultiple(perms);
//       console.log('[Permission Check] Current statuses:', currentStatuses);

//       const granted = Object.values(currentStatuses).every(
//         (status) => status === RESULTS.GRANTED
//       );
//       if (granted) {
//         setStatusMap(currentStatuses);
//         return;
//       }

//       const blocked = Object.values(currentStatuses).some(
//         (status) => status === RESULTS.BLOCKED
//       );
//       if (blocked) {
//         showBlockedAlert();
//         setStatusMap(currentStatuses);
//         return;
//       }

//       if (!hasRequested) {
//         setHasRequested(true);

//         const newStatuses = await requestMultiple(perms);
//         console.log('[Permission Request] New statuses:', newStatuses);

//         const isBlockedNow = Object.values(newStatuses).some(
//           (status) => status === RESULTS.BLOCKED
//         );
//         if (isBlockedNow) {
//           showBlockedAlert();
//         }

//         setStatusMap(newStatuses);
//       } else {
//         setStatusMap(currentStatuses);
//       }
//     } catch (error) {
//       console.error('Permission check/request error:', error);
//       const perms = Array.isArray(permissions) ? permissions : [permissions];
//       const fallbackStatusMap = perms.reduce((acc, p) => {
//         acc[p] = RESULTS.UNAVAILABLE;
//         return acc;
//       }, {} as Record<string, PermissionStatus>);
//       setStatusMap(fallbackStatusMap);
//     }
//   };

//   const openAppSettings = () => {
//     openSettings().catch(() => {
//       console.warn('Unable to open app settings');
//     });
//   };

//   const allStatuses = Object.values(statusMap);

//   return {
//     statusMap,
//     isGranted: allStatuses.every((s) => s === RESULTS.GRANTED),
//     isDenied: allStatuses.some((s) => s === RESULTS.DENIED),
//     isBlocked: allStatuses.some((s) => s === RESULTS.BLOCKED),
//     isLimited: allStatuses.some((s) => s === RESULTS.LIMITED),
//     checkAndRequest,
//     openAppSettings,
//   };
// }



import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  checkMultiple,
  openSettings,
  requestMultiple,
  RESULTS,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';

type UsePermissionsReturn = {
  statusMap: Record<string, PermissionStatus>;
  isGranted: boolean;
  isDenied: boolean;
  isBlocked: boolean;
  isLimited: boolean;
  checkAndRequest: () => Promise<void>;
  openAppSettings: () => void;
  ready: boolean;
};

export default function usePermissions(
  permissions: Permission[] | Permission
): UsePermissionsReturn {
  const [statusMap, setStatusMap] = useState<Record<string, PermissionStatus>>(
    {}
  );
  const [hasRequested, setHasRequested] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    checkAndRequest();
  }, []);

  const showBlockedAlert = () => {
    Alert.alert(
      'Permission Blocked',
      'Permission has been blocked. Please enable it from settings to continue.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Settings',
          onPress: () =>
            openSettings().catch(() => {
              console.warn('Unable to open app settings');
            }),
        },
      ]
    );
  };

  const checkAndRequest = async () => {
    try {
      const perms = Array.isArray(permissions) ? permissions : [permissions];
      let currentStatuses = await checkMultiple(perms);
      console.log('[Permission Check] Current statuses:', currentStatuses);

      const granted = Object.values(currentStatuses).every(
        (status) => status === RESULTS.GRANTED
      );
      if (granted) {
        setStatusMap(currentStatuses);
        setReady(true);
        return;
      }

      const blocked = Object.values(currentStatuses).some(
        (status) => status === RESULTS.BLOCKED
      );
      if (blocked) {
        showBlockedAlert();
        setStatusMap(currentStatuses);
        setReady(true);
        return;
      }

      if (!hasRequested) {
        setHasRequested(true);

        const newStatuses = await requestMultiple(perms);
        console.log('[Permission Request] New statuses:', newStatuses);

        const isBlockedNow = Object.values(newStatuses).some(
          (status) => status === RESULTS.BLOCKED
        );
        if (isBlockedNow) {
          showBlockedAlert();
        }

        setStatusMap(newStatuses);
        setReady(true);
      } else {
        setStatusMap(currentStatuses);
        setReady(true);
      }
    } catch (error) {
      console.error('Permission check/request error:', error);
      const perms = Array.isArray(permissions) ? permissions : [permissions];
      const fallbackStatusMap = perms.reduce((acc, p) => {
        acc[p] = RESULTS.UNAVAILABLE;
        return acc;
      }, {} as Record<string, PermissionStatus>);
      setStatusMap(fallbackStatusMap);
      setReady(true);
    }
  };

  const openAppSettings = () => {
    openSettings().catch(() => {
      console.warn('Unable to open app settings');
    });
  };

  const allStatuses = Object.values(statusMap);

  return {
    statusMap,
    isGranted:
      ready &&
      allStatuses.length > 0 &&
      allStatuses.every((s) => s === RESULTS.GRANTED),
    isDenied: ready && allStatuses.some((s) => s === RESULTS.DENIED),
    isBlocked: ready && allStatuses.some((s) => s === RESULTS.BLOCKED),
    isLimited: ready && allStatuses.some((s) => s === RESULTS.LIMITED),
    checkAndRequest,
    openAppSettings,
    ready,
  };
}