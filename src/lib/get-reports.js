const { asyncFetch, toJSON } = require("./utils");
const { assoc, map, path } = require("ramda");
const { format, subDays } = require("date-fns");

const qs = require("querystring");

module.exports = ({ url, token }) => (advertiser) => {
  //const reportDate = format(subDays(new Date(), 1), 'yyyy-MM-dd')
  const reportDate = "2021-03-25";
  const importDate = format(new Date(), "yyyy-MM-dd");
  // create querystring
  const query = qs.stringify({
    advertiser_id: advertiser,
    start_date: reportDate,
    end_date: reportDate,
    fields: JSON.stringify([
      "ctr",
      "show_uv",
      "stat_cost",
      "click_cost",
      "show_cnt",
      "click_cnt",
      "ecpm",
      "conversion_rate",
    ]),
    time_granularity: "STAT_TIME_GRANULARITY_HOURLY",
    page_size: 1000,
  });

  console.log(query);

  return asyncFetch(`${url}/reports/campaign/get?${query}`, {
    headers: {
      "Access-Token": token,
    },
  })
    .chain(toJSON)
    .map((v) => {
      //console.log(v.data.list);
      var data = {
        advertiserId: `${advertiser}`,
        importDate: `${importDate}`,
        results: v.data.list,
      };
      return data;
    });
};
