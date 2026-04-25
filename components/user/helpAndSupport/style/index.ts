import { StyleSheet } from 'react-native';

export const colors = {
  pink: '#e8174a',
  pinkLight: '#fce8ed',
  text: '#1a1a1a',
  subtext: '#888',
  border: '#ebebeb',
  bg: '#f7f7f9',
  white: '#ffffff',
  subItemText: '#333',
  chevronMuted: '#c0c0c0',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.3,
    marginRight: 36,
  },

  // Section label
  sectionLabel: {
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 12,
    fontWeight: '700',
    color: colors.subtext,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // FAQ list
  faqList: {
    backgroundColor: colors.white,
  },
  faqTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 17,
    backgroundColor: colors.white,
  },
  faqTriggerPressed: {
    backgroundColor: colors.pinkLight,
  },
  faqTriggerLabel: {
    flex: 1,
    fontSize: 15.5,
    fontWeight: '400',
    color: colors.text,
  },
  faqTriggerLabelOpen: {
    color: colors.pink,
    fontWeight: '500',
  },
  faqDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },

  // Dropdown content
  faqContent: {
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },

  // Sub items
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  subItemLast: {
    borderBottomWidth: 0,
  },
  subItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.subItemText,
    fontWeight: '400',
    lineHeight: 20,
  },

  // Contact strip
  contactStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pinkLight,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  contactIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTextBlock: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  contactSubtitle: {
    fontSize: 12.5,
    color: colors.subtext,
    marginTop: 2,
  },

  bottomSpace: {
    height: 40,
  },
});