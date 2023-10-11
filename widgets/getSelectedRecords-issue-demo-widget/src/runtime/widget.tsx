import { React, type AllWidgetProps, Immutable, UseDataSource, FeatureLayerDataSource, IMUseDataSource, DataSourceManager } from 'jimu-core'
import { type IMConfig } from '../config';

const { useEffect, useState } = React;


const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [mainDataSource, setMainDataSource] = useState<FeatureLayerDataSource>();

  /** USEEFFECTS------------------------------------------------------------- */
  useEffect(() => {
    // when the component loads, set the data source into state
    if (props.useDataSources && props.useDataSources.length > 0) {
      (async () => {
        const dsManager = DataSourceManager.getInstance();
        const ds = (await dsManager.createDataSourceByUseDataSource(props.useDataSources[0])) as FeatureLayerDataSource;
        setMainDataSource(ds);
      })()
    }
  }, [props.useDataSources]);

  const selectRecord = (id: string) => {
    if (mainDataSource) {
      console.log('calling .selectRecordsByIds() for ID:', id);
      mainDataSource.selectRecordsByIds([id]);
      console.log('selected record ids:', JSON.stringify(mainDataSource.getSelectedRecordIds()));
      console.log('selected records:', JSON.stringify(mainDataSource.getSelectedRecords()));
    }
  }

  return (
    <div className="widget-demo jimu-widget m-2">
      <p>dataSourceId: {mainDataSource && mainDataSource.id}</p>
      <p><button onClick={() => { selectRecord('27') }}>Select Montana</button></p>
    </div>
  )
}

export default Widget
