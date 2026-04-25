

export interface SubCategory {
  id:        string;
  name:      string;
  subtitle:  string;
  icon:      string;
  bgColor:   string;
  badgeText?: string;
}

export interface CategoryTab {
  id:             string;
  label:          string;
  subCategories:  SubCategory[];
}



export interface CategoryItem {
  id:       string;
  label:    string;
  emoji:    string;
  bg:       string;
  badge?:   string;
}

export interface CategoryGridProps {
  activeTab:    string;
  onItemPress?: (item: CategoryItem) => void;
}