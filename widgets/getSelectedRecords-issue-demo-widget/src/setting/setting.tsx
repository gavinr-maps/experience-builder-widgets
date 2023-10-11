/** @jsx jsx */
import { React, Immutable, jsx, AllDataSourceTypes, type UseDataSource } from 'jimu-core';
import { type AllWidgetSettingProps } from 'jimu-for-builder';
import { MapWidgetSelector, SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components';
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'

export default function Setting(
  props: AllWidgetSettingProps<any>
): React.ReactElement {


  const onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    props.onSettingChange({
      id: props.id,
      useDataSourcesEnabled
    })
  }

  const onDataSourceChange = async (useDataSources: UseDataSource[]) => {
    // Save the data sources:
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  }

  return (
    <React.Fragment>
      <SettingSection
        title={'Map Widget'}
      >
        <SettingRow className="setting-row" label={'Select Map Widget'} flow="wrap">
          <MapWidgetSelector
            onSelect={(useMapWidgetIds: string[]) => {
              props.onSettingChange({
                id: props.id,
                useMapWidgetIds: useMapWidgetIds
              });
            }}
            useMapWidgetIds={props.useMapWidgetIds}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection>
        {/* First have the user select ALL the data sources: */}
        <SettingRow level={1} flow='wrap' label={'Data source'}>
          <DataSourceSelector
            types={Immutable([AllDataSourceTypes.FeatureLayer])}
            useDataSources={props.useDataSources}
            useDataSourcesEnabled={props.useDataSourcesEnabled}
            onToggleUseDataEnabled={onToggleUseDataEnabled}
            onChange={onDataSourceChange}
            widgetId={props.id}
            isMultiple={false}
          />
        </SettingRow>
      </SettingSection>

    </React.Fragment>
  );
};