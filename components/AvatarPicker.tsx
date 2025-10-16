import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Camera, Image, X } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './Card';
import { Button } from './Button';

interface AvatarPickerProps {
  currentAvatar?: string;
  onAvatarChange: (avatarUri: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  currentAvatar,
  onAvatarChange,
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const predefinedAvatars = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  ];

  const handleCameraPress = () => {
    Alert.alert(
      'Camera',
      'Camera functionality would be implemented here',
      [{ text: 'OK' }]
    );
  };

  const handleGalleryPress = () => {
    Alert.alert(
      'Gallery',
      'Gallery functionality would be implemented here',
      [{ text: 'OK' }]
    );
  };

  const handleAvatarSelect = (avatarUri: string) => {
    onAvatarChange(avatarUri);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.avatarButton, { backgroundColor: theme.primary + '20' }]}
        onPress={() => setModalVisible(true)}
      >
        <Camera size={16} color={theme.primary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Change Avatar</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.closeButton, { backgroundColor: theme.cardSecondary }]}
            >
              <X size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {/* Camera and Gallery Options */}
            <View style={styles.optionButtons}>
              <Button
                title="Take Photo"
                onPress={handleCameraPress}
                variant="outline"
                size="medium"
                style={styles.optionButton}
              />
              <Button
                title="Choose from Gallery"
                onPress={handleGalleryPress}
                variant="outline"
                size="medium"
                style={styles.optionButton}
              />
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>Or choose a preset:</Text>

            {/* Predefined Avatars */}
            <View style={styles.avatarGrid}>
              {predefinedAvatars.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.avatarOption,
                    { borderColor: currentAvatar === avatar ? theme.primary : theme.border }
                  ]}
                  onPress={() => handleAvatarSelect(avatar)}
                >
                  <View style={styles.avatarImageContainer}>
                    <Text style={[styles.avatarInitial, { color: theme.text }]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  optionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  optionButton: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  avatarOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
