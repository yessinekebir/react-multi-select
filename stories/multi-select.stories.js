import React from "react";
import { action, storiesOf } from "@storybook/react";
import ReactMultiSelect from "../src/components/multi_select";
import { boolean, number, withKnobs } from "@storybook/addon-knobs";
import Readme from "../README.md";
import withReadme from "storybook-readme/with-readme";
import customStyle from "./custom_style.scss";
import SelectAll from "./custom_components/select_all";
import SelectionStatus from "./custom_components/selection_status";
import Search, { SearchWithValue } from "./custom_components/search";
import Item from "./custom_components/item";
import SelectedItem from "./custom_components/selected_item";

const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
};

const generateItems = size =>
  Array.apply(null, { length: size }).map((i, index) => ({
    id: index,
    label: `Item ${index}`
  }));

const items = generateItems(50);

const manyItems = generateItems(7000);

const withDisabledItems = generateItems(10).map((i, index) => ({
  ...i,
  disabled: index % 5 === 0
}));

storiesOf("React Multi Select", module)
  .addDecorator(withKnobs)
  .add(
    "Default view",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
        />
      );
    })
  )
  .add(
    "With different height",
    withReadme(Readme, () => {
      return (
        <div style={{ height: "1000px" }}>
          <ReactMultiSelect
            responsiveHeight={
              number("Height %", 50, { min: 0, max: 100 }) + "%"
            }
            items={items}
            loading={boolean("Loading", false)}
            onChange={action("onChange")}
            showSearch={boolean("Show search", true)}
            showSelectAll={boolean("Show select all", true)}
          />
        </div>
      );
    })
  )
  .add(
    "Preselected Items",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          selectedItems={[{ id: 3, label: "Item 3" }]}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
        />
      );
    })
  )
  .add(
    "With max selected items",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          maxSelectedItems={4}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
          messages={{ disabledItemsTooltip: "You can select up to 4 items" }}
        />
      );
    })
  )
  .add(
    "With some of the items disabled",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={withDisabledItems}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
          messages={{ disabledItemsTooltip: "You can select up to 4 items" }}
        />
      );
    })
  )
  .add(
    "With Custom Messages",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          messages={custom_messages}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
        />
      );
    })
  )
  .add(
    "With Custom Styling",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          wrapperClassName={customStyle.wrapper}
          listHeight={500}
          selectedListHeight={540}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
          itemHeight={60}
          selectAllHeight={40}
        />
      );
    })
  )
  .add(
    "Without Search and Select all",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          listHeight={500}
          selectedListHeight={448}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={false}
          showSelectAll={false}
        />
      );
    })
  )
  .add(
    "With Large Data (7000 items)",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={manyItems}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
        />
      );
    })
  )
  .add(
    "Without Selected Items",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={manyItems}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
          showSelectedItems={boolean("Show selected items", false)}
        />
      );
    })
  )
  .add(
    "With custom components",
    withReadme(Readme, () => {
      return (
        <ReactMultiSelect
          items={items}
          itemRenderer={Item}
          selectAllRenderer={SelectAll}
          searchRenderer={Search}
          selectedItemRenderer={SelectedItem}
          selectionStatusRenderer={SelectionStatus}
          loading={boolean("Loading", false)}
          onChange={action("onChange")}
          showSearch={boolean("Show search", true)}
          showSelectAll={boolean("Show select all", true)}
        />
      );
    })
  )
  .add(
    "With custom components and custom value",
    withReadme(Readme, () => {
      class ValueController extends React.Component {
        state = {
          value: ""
        };

        onChange = value => {
          this.setState({ value });
        };

        render() {
          return (
            <ReactMultiSelect
              searchValue={this.state.value}
              searchValueChanged={this.onChange}
              items={items}
              itemRenderer={Item}
              selectAllRenderer={SelectAll}
              searchRenderer={SearchWithValue}
              selectedItemRenderer={SelectedItem}
              selectionStatusRenderer={SelectionStatus}
              loading={boolean("Loading", false)}
              onChange={action("onChange")}
              showSearch={boolean("Show search", true)}
              showSelectAll={boolean("Show select all", true)}
            />
          );
        }
      }

      return <ValueController />;
    })
  );
