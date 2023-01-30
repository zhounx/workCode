<template>
	<div id="main" style="height: 300px;"></div>
</template>
<script lang="ts" setup>
	import {onMounted,watch} from "vue";
	// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口
	import * as echarts from 'echarts/core';
	// 引入折线图图表，图表后缀都为 Chart
	import { LineChart  } from 'echarts/charts';
	// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
	import {
	  TitleComponent,
	  TooltipComponent,
	  GridComponent,
	  DatasetComponent,
	  TransformComponent
	} from 'echarts/components';
	// 标签自动布局，全局过渡动画等特性
	import { LabelLayout, UniversalTransition } from 'echarts/features';
	// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
	import { CanvasRenderer } from 'echarts/renderers';
	const props = defineProps({
		xvalues: {
			type:Array,
			default:[],
		},
		yvalues:{
			type:Array,
			default:[],
		},
		active:{
			type:Number,
			default:1,
		}
	})
	// 注册必须的组件
	echarts.use([
	  TitleComponent,
	  TooltipComponent,
	  GridComponent,
	  DatasetComponent,
	  TransformComponent,
	  LineChart,
	  LabelLayout,
	  UniversalTransition,
	  CanvasRenderer
	]);
	watch(props, (newVal, oldVal) => {
		renderEchart()
	});
	function renderEchart(){
		let myChart = echarts.init(document.getElementById("main"));
		myChart.setOption({
			tooltip: { 
				show:true,
                trigger: 'axis'
			},
			xAxis: {
				data:props.xvalues,
				axisLabel:{
					interval:props.active===2?0:1,
					formatter: function (values:string, index:number) {
						let value = values.substring(0,16)
						let newValue= ''
						if(props.active===1){
							if(index>0){
								newValue = (props.xvalues[index-1].substring(0,10)===props.xvalues[index].substring(0,10))?value.substring(10):value.split(" ").join("\n")
							}else{
								newValue=value.split(" ").join("\n")
							}
						}
						if(props.active===2){
							if(index>0){
								newValue = (props.xvalues[index-1].substring(0,10)===props.xvalues[index].substring(0,10))?'':value.substring(5,10)
							}else{
								newValue=value.substring(5,10).split(" ").join("\n")
							}
						}
						if(props.active===3){
							newValue=value.substring(5,10)
						}
						return newValue
					}
				}
			},
            grid: {
                top: '30',
                left: '0',
                right: '0',
                bottom: '0',
                containLabel: true
            },
			yAxis: {
                type:'value',
                scale:true,
                splitLine:{
                    lineStyle:{
                        type:'dashed'
                    }
                },
                show:true
            },
			series: [{
				name: "汇率",
				type: "line",
                symbol: "none",
				data:props.yvalues,
                smooth:true,
                areaStyle: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                    {offset: 0, color:'rgba(16, 207, 131,0.3)'},
                    {offset: 1, color:'rgba(93, 211, 240,0.3)'}         
                ])},
                lineStyle:{color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                    {offset: 0, color: '#10CF83'},
                    {offset: 1, color: '#61D8EE'}
                ])},
			}],
		});
		window.onresize = function() {
			myChart.resize();
		};
	}
	onMounted(() => {
		renderEchart()
	})
</script>