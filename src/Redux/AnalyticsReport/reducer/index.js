const init = {
  gameRackReport: {},
  userReport:{},

};

const AnalyticsReportReducer = (state = init, { type, payload, totalKey }) => {
  switch (type) {
    case "GET_GAME_RACK_REPORT": {

      let analyticsData = {};
      let mergeData = payload.reduce((acc, cur) => {
        let dateKey = Object.keys(cur);
        let temp = {};
        temp = dateKey.reduce((pre, next) => {
          return Object.keys(acc)?.length > 0
            ? { ...pre, [next]: [cur[next], ...acc[next]] }
            : { ...pre, [next]: [cur[next]] };
        }, {});
        return { ...acc, ...temp };
      }, {});
      analyticsData = { ...analyticsData, gameRackReport: { ...mergeData } };
      return { ...state, gameRackReport: { ...analyticsData } };
    }
    case "ANALYTICS_USER_REPORT":{
      let keys = Object.keys(payload);
      let analyticsData = {};
      keys?.map(name => {
        let mergedData = payload[name].reduce(( acc, cur ) => {
          let dataKeys = Object.keys(cur);
          let temp = {};
          temp = dataKeys.reduce((pre, next) => {
            return Object.keys(acc).length > 0
                ? { ...pre, [next]: [ cur[next], ...acc[next] ] } :
                { ...pre, [next]: [ cur[next] ] }
          }, {})
          return { ...acc, ...temp  }
        }, {})
        let activeUserTotal = 0;
        Object.keys(mergedData || {}).map(totalKey => {
          if (totalKey.toLocaleLowerCase().includes('total'))  {
            activeUserTotal = mergedData[totalKey].reduce((acc, cur) => acc + cur, 0);
          }
        })
        analyticsData = { ...analyticsData, [name]: { ...mergedData, activeUserTotal  } }
      })
      return { ...state,userReport: {...analyticsData, totalKey:totalKey} }
    }
    default: {
      return state;
    }
  }
};
export default AnalyticsReportReducer;
