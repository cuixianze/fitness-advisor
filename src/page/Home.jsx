import React from "react";
import Button from "../components/button";
import { CiDumbbell } from "react-icons/ci";
import "../css/home.css";

export default function Home() {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen">
      <section className="max-w-3xl mx-auto py-16 px-6 text-center">
        <CiDumbbell className="mx-auto text-green-500 w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Preview</h1>
        <p className="text-lg text-gray-300">
          <span className="text-green-400 font-semibold">맞춤형 루틴</span>으로{" "}
          <span className="text-green-400 font-semibold">헬스</span>의 시작을 더
          쉽게
        </p>
      </section>

      <section className="bg-white text-gray-800 py-12 px-6 space-y-6">
        <p className="text-xl font-medium">
          헬스장 가서 어떤 운동을 해야할지 막막하셨다면??
        </p>
        <div className="space-y-3">
          {[
            "헬스를 시작하고 싶은데, 무슨 운동을 해야할지 모르겠어요.",
            "매주 운동 횟수가 일정하지 않아, 짜여진 루틴을 따라가기 어려웠어요.",
            "매일 무슨 운동을 할지 고민하다가, 시작하기도 전에 지쳐버렸어요.",
          ].map((text, i) => (
            <p key={i} className="bg-gray-100 p-4 rounded-lg">
              "{text}"
            </p>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto py-12 px-6 text-center space-y-4">
        <p className="text-xl font-semibold">헬스 프리뷰, 이렇게 진행합니다.</p>
        <div className="flex justify-center space-x-4">
          {["1. 간단한 질문지 작성", "2. AI 맞춤형 분석", "3. 개인 루틴 즉시 제공"].map(
            (step) => (
              <p key={step} className="flex-1 bg-gray-800 p-4 rounded-lg">
                {step}
              </p>
            )
          )}
        </div>
      </section>

      <section className="bg-gray-800 text-gray-200 py-12 px-6 text-center space-y-2">
        <p className="text-lg font-semibold">
          나만을 위한 맞춤 루틴, 이렇게 만들어져요.
        </p>
        <p>
          당신의 최근 운동 데이터를 분석하고, 오늘의 컨디션을 반영해 최적의 루틴을 설계합니다.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          {["데이터", "맞춤형", "최적화"].map((item) => (
            <span key={item} className="px-4 py-2 bg-gray-700 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "개인별 맞춤 분석",
            desc: "제출해주신 최근 운동 이력과 컨디션을 분석해 당신의 몸 상태를 정확히 파악합니다.",
          },
          {
            title: "오늘의 루틴",
            desc: "분석된 데이터를 바탕으로, 오늘 당신에게 가장 적합한 무산소 운동 루틴을 설계합니다.",
          },
          {
            title: "지속 가능한 시작",
            desc: "복잡한 계획 대신 하루치 루틴으로 꾸준한 운동 습관을 만들어 드립니다.",
          },
        ].map(({ title, desc }) => (
          <div
            key={title}
            className="bg-white text-gray-900 p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{desc}</p>
            <p className="text-green-500 font-medium">실제고객 예시 보기 ↘</p>
          </div>
        ))}
      </section>

      <section className="text-center py-12">
        <Button />
      </section>
    </main>
  );
}
