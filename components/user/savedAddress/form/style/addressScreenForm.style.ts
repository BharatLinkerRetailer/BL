import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  brand: '#ff033d',
  brandLight: '#FFF0F3',
  brandBorder: '#fca5b6',
  surface: '#ffffff',
  bg: '#F7F7F8',
  text: '#1A1A1A',
  muted: '#7A7A8A',
  border: '#E4E4EC',
  inputBg: '#F9F9FB',
  success: '#22C55E',
  placeholder: '#BBBBC8',
};

export const FONTS = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
};







































export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 25,
    paddingVertical: 17,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    // ...Platform.select({
    //   ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
    //   android: { elevation: 2 },
    // }),
    
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: FONTS.semiBold,
    color: COLORS.text,
  },
  mapThumb: {
    height: 150,
    backgroundColor: '#DDE8F0',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -9 }, { translateY: -22 }],
    alignItems: 'center',
  },
  pinDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.brand,
    borderWidth: 3,
    borderColor: COLORS.surface,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  pinStem: {
    width: 2,
    height: 10,
    backgroundColor: COLORS.brand,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },




  //location Bar
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
    marginRight: 12,
  },
  locationIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: FONTS.semiBold,
    color: COLORS.text,
  },
  locationSub: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 17,
  },
  changeButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.brandLight,
    borderWidth: 1,
    borderColor: COLORS.brandBorder,
    borderRadius: 20,
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: FONTS.medium,
    color: COLORS.brand,
  },
  scrollContent: {
    paddingBottom: 32,
  },










  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: FONTS.semiBold,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  fieldGroup: {
    gap: 12,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: FONTS.medium,
    color: COLORS.muted,
    letterSpacing: 0.2,
  },
  required: {
    color: COLORS.brand,
  },
  optional: {
    color: COLORS.muted,
    fontWeight: FONTS.regular,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: COLORS.brand,
    backgroundColor: COLORS.surface,
  },
  textArea: {
    height: 72,
    textAlignVertical: 'top',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  phoneRowFocused: {
    borderColor: COLORS.brand,
    backgroundColor: COLORS.surface,
  },
  phonePrefix: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: FONTS.medium,
    color: COLORS.text,
    borderRightWidth: 1.5,
    borderRightColor: COLORS.border,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: 'transparent',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
  },
  chipActive: {
    borderColor: COLORS.brand,
    backgroundColor: COLORS.brandLight,
  },
  chipText: {
    fontSize: 13,
    fontWeight: FONTS.medium,
    color: COLORS.muted,
  },
  chipTextActive: {
    color: COLORS.brand,
  },





  
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: FONTS.medium,
    color: COLORS.text,
  },
  toggleSub: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  saveSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  saveButton: {
    paddingVertical: 16,
    backgroundColor: COLORS.brand,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#D0D0DC',
  },
  saveButtonSuccess: {
    backgroundColor: COLORS.success,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: FONTS.semiBold,
    color: COLORS.surface,
    letterSpacing: 0.4,
  },
});