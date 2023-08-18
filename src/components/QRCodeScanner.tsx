// import React from "react";
// import { useState, useEffect } from "react";
// import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { RNCamera } from "react-native-camera";
// import { check, PERMISSIONS, request } from "react-native-permissions";

// interface QRCodeScannerProps {
//   onClose: () => void;
// }

// const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onClose }) => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(false);

//   useEffect(() => {
//     checkCameraPermission();
//   }, []);

//   const checkCameraPermission = async () => {
//     const result = await check(PERMISSIONS.ANDROID.CAMERA);
//     if (result === "granted") {
//       setHasCameraPermission(true);
//     } else {
//       requestCameraPermission();
//     }
//   };

//   const requestCameraPermission = async () => {
//     const result = await request(PERMISSIONS.ANDROID.CAMERA);
//     if (result === "granted") {
//       setHasCameraPermission(true);
//     }
//   };

//   if (!hasCameraPermission) {
//     return (
//       <View style={styles.container}>
//         <Text>Please grant camera permission to use the QR code scanner.</Text>
//         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//           <Icon name="close-outline" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     );
//   }
//   return (
//     <View style={styles.container}>
//       <RNCamera
//         style={styles.camera}
//         type={RNCamera.Constants.Type.back}
//         captureAudio={false}
//         onBarCodeRead={(event) => {
//           // Handle the scanned QR code data here
//           console.log(event.data);
//         }}
//       />
//       <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//         <Icon name="close-outline" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 20,
//     right: 20,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 10,
//     borderRadius: 20,
//   },
// });

// export default QRCodeScanner;
