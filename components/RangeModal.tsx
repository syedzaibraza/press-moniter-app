import { Modal, TextInput, Button, View, Text } from "react-native";

const RangeModal = ({
  visible,
  rangeInput,
  onClose,
  onSubmit,
  setRangeInput,
}: any) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`bg-white rounded-lg p-6 w-4/5`}>
          <Text className={`text-lg font-bold mb-4`}>
            Enter the Range of News Clips
          </Text>
          <TextInput
            className={`border border-gray-300 rounded-lg p-2 mb-4`}
            placeholder="e.g., '1-100'"
            onChangeText={setRangeInput}
            value={rangeInput}
          />
          <Button title="Submit" onPress={onSubmit} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default RangeModal;
