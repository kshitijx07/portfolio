"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Cpu, Terminal, ShieldCheck, Zap, Activity, Server, Layers, CheckCircle2 } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

export default function DevOpsTerminalSandbox() {
  const [activeTab, setActiveTab] = useState<"k8s" | "pipeline" | "lambda">("k8s");

  // 1. K8s Simulator State
  const [trafficLoad, setTrafficLoad] = useState<number>(30); // 0 to 100%
  const [podsCount, setPodsCount] = useState<number>(2);

  useEffect(() => {
    if (trafficLoad > 75) setPodsCount(5);
    else if (trafficLoad > 50) setPodsCount(4);
    else if (trafficLoad > 30) setPodsCount(3);
    else setPodsCount(2);
  }, [trafficLoad]);

  // 2. Pipeline Runner State
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [isRunningPipeline, setIsRunningPipeline] = useState<boolean>(false);

  const runPipeline = () => {
    if (isRunningPipeline) return;
    setIsRunningPipeline(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 800);
    setTimeout(() => setPipelineStep(3), 1600);
    setTimeout(() => setPipelineStep(4), 2400);
    setTimeout(() => setIsRunningPipeline(false), 3000);
  };

  // 3. Lambda Cold Start State
  const [lambdaMode, setLambdaMode] = useState<"warm" | "cold">("warm");
  const [lambdaExecutionTime, setLambdaExecutionTime] = useState<number>(42);
  const [isExecutingLambda, setIsExecutingLambda] = useState<boolean>(false);

  const triggerLambda = () => {
    setIsExecutingLambda(true);
    setTimeout(() => {
      setLambdaExecutionTime(lambdaMode === "warm" ? Math.floor(Math.random() * 20 + 35) : Math.floor(Math.random() * 150 + 720));
      setIsExecutingLambda(false);
    }, 600);
  };

  return (
    <PinterestCardWrapper>
      <div className="w-full overflow-hidden" data-cursor="Arcade">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
                DevOps Arcade & Interactive System Simulator
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00B8A3]/10 dark:bg-[#00B8A3]/20 text-[#00B8A3] text-[10px] font-mono font-bold uppercase">
                <Zap size={11} className="animate-pulse" />
                Interactive Sandbox
              </span>
            </div>
            <p className="text-xs text-[#5C5955] dark:text-[#A3A098] font-mono transition-colors">
              Simulate live cloud deployments, Kubernetes pod autoscaling & serverless cold-start latency
            </p>
          </div>

          {/* Game Simulator Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#EFECE6] dark:bg-[#2A2825] p-1 rounded-full transition-colors">
            <button
              onClick={() => setActiveTab("k8s")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === "k8s"
                  ? "bg-[#C86D51] dark:bg-[#E07A5F] text-white shadow-sm font-bold"
                  : "text-[#5C5955] dark:text-[#A3A098] hover:text-[#1A1918] dark:hover:text-[#FAF9F7]"
              }`}
            >
              <Server size={13} />
              <span>K8s HPA</span>
            </button>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === "pipeline"
                  ? "bg-[#C86D51] dark:bg-[#E07A5F] text-white shadow-sm font-bold"
                  : "text-[#5C5955] dark:text-[#A3A098] hover:text-[#1A1918] dark:hover:text-[#FAF9F7]"
              }`}
            >
              <Terminal size={13} />
              <span>CI/CD Runner</span>
            </button>
            <button
              onClick={() => setActiveTab("lambda")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === "lambda"
                  ? "bg-[#C86D51] dark:bg-[#E07A5F] text-white shadow-sm font-bold"
                  : "text-[#5C5955] dark:text-[#A3A098] hover:text-[#1A1918] dark:hover:text-[#FAF9F7]"
              }`}
            >
              <Zap size={13} />
              <span>AWS Lambda</span>
            </button>
          </div>
        </div>

        {/* Game Simulator Display Screen */}
        <div className="bg-[#1A1918] dark:bg-[#151413] text-white p-6 rounded-3xl border border-[#2B2A29] dark:border-[#2E2C29] shadow-2xl transition-colors">
          <AnimatePresence mode="wait">
            {/* GAME 1: Kubernetes HPA Autoscaling Simulator */}
            {activeTab === "k8s" && (
              <motion.div
                key="k8s"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2B2A29]">
                  <div>
                    <span className="text-[10px] font-mono text-[#E07A5F] uppercase font-bold tracking-wider block">
                      SIMULATOR MODE 01 // KUBERNETES AUTOSCALER
                    </span>
                    <h4 className="text-lg font-editorial font-bold text-white">
                      HostelHub Pod Auto-Scale Challenge (HPA)
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#A3A098]">Active Replicas:</span>
                    <span className="px-3 py-1 rounded-full bg-[#00B8A3]/20 text-[#00B8A3] font-bold text-sm">
                      {podsCount} Pods
                    </span>
                  </div>
                </div>

                {/* Interactive Traffic Control Slider */}
                <div className="space-y-2 bg-[#242220] p-4 rounded-2xl border border-[#2B2A29]">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#A3A098]">Incoming HTTP Traffic Load:</span>
                    <span className="font-bold text-[#E07A5F]">{trafficLoad * 50} req/sec ({trafficLoad}% CPU)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={trafficLoad}
                    onChange={(e) => setTrafficLoad(Number(e.target.value))}
                    className="w-full accent-[#E07A5F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#A3A098]">
                    <span>10% Idle (2 Pods)</span>
                    <span>50% Load (3-4 Pods)</span>
                    <span>100% Spike (5 Pods Max)</span>
                  </div>
                </div>

                {/* Animated Pod Grid */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#A3A098] block">POD REPLICA POOL STATE:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const isPodActive = idx < podsCount;
                      return (
                        <motion.div
                          key={idx}
                          animate={{ scale: isPodActive ? 1 : 0.9, opacity: isPodActive ? 1 : 0.3 }}
                          className={`p-3 rounded-xl border font-mono text-center flex flex-col items-center justify-center transition-all ${
                            isPodActive
                              ? "bg-[#282522] border-[#00B8A3] text-white shadow-lg"
                              : "bg-[#1C1B19] border-[#2B2A29] text-[#6E6C68]"
                          }`}
                        >
                          <Server size={18} className={isPodActive ? "text-[#00B8A3] mb-1" : "text-[#6E6C68] mb-1"} />
                          <span className="text-xs font-bold block">Pod-0{idx + 1}</span>
                          <span className="text-[10px] opacity-80">{isPodActive ? "RUNNING" : "STANDBY"}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* GAME 2: CI/CD Jenkins Pipeline Runner */}
            {activeTab === "pipeline" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2B2A29]">
                  <div>
                    <span className="text-[10px] font-mono text-[#E07A5F] uppercase font-bold tracking-wider block">
                      SIMULATOR MODE 02 // CI/CD PIPELINE EXECUTION
                    </span>
                    <h4 className="text-lg font-editorial font-bold text-white">
                      Jenkins Automated Deployment Runner
                    </h4>
                  </div>
                  <button
                    onClick={runPipeline}
                    disabled={isRunningPipeline}
                    className="px-4 py-2 rounded-full bg-[#E07A5F] hover:bg-[#c86d51] disabled:opacity-50 text-white text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Play size={14} />
                    <span>{isRunningPipeline ? "Deploying Pipeline..." : "Trigger Pipeline"}</span>
                  </button>
                </div>

                {/* Pipeline 4-Stage Progress Visualizer */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { title: "01. Lint & Test", desc: "JUnit & ESLint validation" },
                    { title: "02. Docker Build", desc: "Multi-stage container build" },
                    { title: "03. Push Registry", desc: "DockerHub image push" },
                    { title: "04. Kube Rollout", desc: "AWS EKS pod deployment" },
                  ].map((stage, idx) => {
                    const stepNum = idx + 1;
                    const isDone = pipelineStep > stepNum || (pipelineStep === 4 && !isRunningPipeline);
                    const isCurrent = pipelineStep === stepNum && isRunningPipeline;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border font-mono transition-all ${
                          isDone
                            ? "bg-[#1E2A20] border-[#4E6E52] text-white"
                            : isCurrent
                            ? "bg-[#38241E] border-[#E07A5F] text-white animate-pulse"
                            : "bg-[#242220] border-[#2B2A29] text-[#6E6C68]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold">{stage.title}</span>
                          {isDone && <CheckCircle2 size={14} className="text-[#00B8A3]" />}
                        </div>
                        <span className="text-[10px] opacity-80 block">{stage.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* GAME 3: AWS Serverless Lambda Trigger */}
            {activeTab === "lambda" && (
              <motion.div
                key="lambda"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2B2A29]">
                  <div>
                    <span className="text-[10px] font-mono text-[#E07A5F] uppercase font-bold tracking-wider block">
                      SIMULATOR MODE 03 // AWS LAMBDA EXECUTION
                    </span>
                    <h4 className="text-lg font-editorial font-bold text-white">
                      Serverless AI X-Ray Cold-Start Benchmark
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLambdaMode("warm")}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                        lambdaMode === "warm" ? "bg-[#00B8A3] text-black font-bold" : "bg-[#2B2A29] text-[#A3A098]"
                      }`}
                    >
                      Warm Start
                    </button>
                    <button
                      onClick={() => setLambdaMode("cold")}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                        lambdaMode === "cold" ? "bg-[#E07A5F] text-white font-bold" : "bg-[#2B2A29] text-[#A3A098]"
                      }`}
                    >
                      Cold Start
                    </button>
                  </div>
                </div>

                {/* Lambda Execution Benchmarking Console */}
                <div className="bg-[#242220] p-5 rounded-2xl border border-[#2B2A29] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[#A3A098] block mb-1">EXECUTION LATENCY BENCHMARK:</span>
                    <div className="text-3xl font-editorial font-bold text-white flex items-center gap-2">
                      <span className={lambdaMode === "warm" ? "text-[#00B8A3]" : "text-[#E07A5F]"}>
                        {isExecutingLambda ? "Executing..." : `${lambdaExecutionTime} ms`}
                      </span>
                      <span className="text-xs font-mono text-[#A3A098] font-normal">
                        ({lambdaMode === "warm" ? "Warm Container Cached" : "Container Init + MobileNet TFLite Load"})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={triggerLambda}
                    disabled={isExecutingLambda}
                    className="px-5 py-2.5 rounded-full bg-[#E07A5F] hover:bg-[#c86d51] text-white text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Zap size={14} />
                    <span>Trigger Lambda</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PinterestCardWrapper>
  );
}
