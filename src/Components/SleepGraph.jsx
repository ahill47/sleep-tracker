import React, { Component, useEffect, useState } from 'react';
import {
  VerticalBarSeries,
  XAxis,
  YAxis,
  XYPlot,
  HorizontalGridLines,
} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import { Card, CardContent } from 'material-ui-core';
import RVStyles from 'react-vis-styles';
import axiosWithAuth from './axiosWithAuth';
import Moment from 'moment';

const SleepGraph = ({ logs }) => {
  // const fakeRes = {
  //   id: 1,
  //   username: 'joedoe',
  //   data: [
  //     {
  //       id: 1,
  //       date: '2020-04-21',
  //       sleepStart: '2020-04-21 21:15:00.000',
  //       sleepEnd: '2020-04-22 07:15:00.000',
  //       duration: 6,
  //       moodBeforeSleep: 1,
  //       moodAfterSleep: 3,
  //       sleepScore: 7,
  //       user_id: 1,
  //     },
  //     {
  //       id: 2,
  //       date: '2020-04-22',
  //       sleepStart: '2020-04-22 021:15:00.000',
  //       sleepEnd: '2020-04-23 07:15:00',
  //       duration: 4,
  //       moodBeforeSleep: 4,
  //       moodAfterSleep: 4,
  //       sleepScore: 5.5,
  //       user_id: 1,
  //     },
  //     {
  //       id: 3,
  //       date: '2020-04-23',
  //       sleepStart: '2020-04-21 21:15:00.000',
  //       sleepEnd: '2020-04-22 07:15:00.000',
  //       duration: 8,
  //       moodBeforeSleep: 2,
  //       moodAfterSleep: 2,
  //       sleepScore: null,
  //       user_id: 1,
  //     },
  //     {
  //       id: 4,
  //       date: '2020-04-24',
  //       sleepStart: '2020-04-21 21:15:00.000',
  //       sleepEnd: '2020-04-22 07:15:00.000',
  //       duration: 8,
  //       moodBeforeSleep: 1,
  //       moodAfterSleep: 3,
  //       sleepScore: 7,
  //       user_id: 1,
  //     },
  //     {
  //       id: 5,
  //       date: '2020-04-25',
  //       sleepStart: '2020-04-22 021:15:00.000',
  //       sleepEnd: '2020-04-23 07:15:00',
  //       duration: 7,
  //       moodBeforeSleep: 4,
  //       moodAfterSleep: 4,
  //       sleepScore: 5.5,
  //       user_id: 1,
  //     },
  //     {
  //       id: 6,
  //       date: '2020-04-26',
  //       sleepStart: '2020-04-21 21:15:00.000',
  //       sleepEnd: '2020-04-22 07:15:00.000',
  //       duration: 6,
  //       moodBeforeSleep: 2,
  //       moodAfterSleep: 2,
  //       sleepScore: null,
  //       user_id: 1,
  //     },
  //     {
  //       id: 7,
  //       date: '2020-04-27',
  //       sleepStart: '2020-04-21 21:15:00.000',
  //       sleepEnd: '2020-04-22 07:15:00.000',
  //       duration: 4,
  //       moodBeforeSleep: 2,
  //       moodAfterSleep: 2,
  //       sleepScore: null,
  //       user_id: 1,
  //     },
  //   ],
  // };

  const [useData, setUseData] = useState([
    {
      x: new Moment().subtract(7, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
    {
      x: new Moment().subtract(6, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
    {
      x: new Moment().subtract(5, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
    {
      x: new Moment().subtract(4, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
    {
      x: new Moment().subtract(3, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
    {
      x: new Moment().subtract(2, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
    {
      x: new Moment().subtract(1, 'day').format('YYYY/MM/DD').slice(5),
      y: 0,
    },
  ]);

  console.log('CHARTTTTTTTTT', useData[0]);

  useEffect(() => {
    let tmpArr = [];
    if (logs) {
      for (let i = 0; i < logs.length; i++) {
        let tempData = {
          x: new Moment(logs[logs.length - 1 - i].date)
            .format('YYYY/MM/DD')
            .slice(5),
          y: Math.floor(logs[logs.length - 1 - i].duration),
        };
        tmpArr[i] = tempData;
      }
    }
    setUseData(tmpArr);
  }, [logs]);

  // if (props.logs) {
  //  chartData = {
  //   { x: props.logs[0].date.slice(5), y: fakeRes.data[0].duration },
  //   { x: fakeRes.data[1].date.slice(5), y: fakeRes.data[1].duration },
  //   { x: fakeRes.data[2].date.slice(5), y: fakeRes.data[2].duration },
  //   { x: fakeRes.data[3].date.slice(5), y: fakeRes.data[3].duration },
  //   { x: fakeRes.data[4].date.slice(5), y: fakeRes.data[4].duration },
  //   { x: fakeRes.data[5].date.slice(5), y: fakeRes.data[5].duration },
  //   { x: fakeRes.data[6].date.slice(5), y: fakeRes.data[6].duration },
  //  }
  // }

  // const dummyData = [
  //   { x: fakeRes.data[0].date.slice(5), y: fakeRes.data[0].duration },
  //   { x: fakeRes.data[1].date.slice(5), y: fakeRes.data[1].duration },
  //   { x: fakeRes.data[2].date.slice(5), y: fakeRes.data[2].duration },
  //   { x: fakeRes.data[3].date.slice(5), y: fakeRes.data[3].duration },
  //   { x: fakeRes.data[4].date.slice(5), y: fakeRes.data[4].duration },
  //   { x: fakeRes.data[5].date.slice(5), y: fakeRes.data[5].duration },
  //   { x: fakeRes.data[6].date.slice(5), y: fakeRes.data[6].duration },
  // ];

  return (
    <div className='graphCard'>
      <p className='chartTitle'></p>
      <RVStyles />
      <XYPlot height={400} width={700} xType='ordinal'>
        <HorizontalGridLines />
        <VerticalBarSeries
          data-testid='vertical-barchart'
          data={useData}
          barWidth={0.8}
          opacity={0.9}
          color='#195e83'
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default SleepGraph;
