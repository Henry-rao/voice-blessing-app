"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mic,
  Play,
  Bluetooth,
  Wand2,
  Heart,
  Sparkles,
  Volume2,
  CheckCircle,
  Loader2,
  Upload,
  Trash2,
  Download,
} from "lucide-react"

// 自定义暂停图标组件
const CustomPauseIcon = ({ className = "w-5 h-5 text-gray-700" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
)

type PageType = "welcome" | "clone" | "connect" | "play"
type StyleType = "humor" | "formal" | "poetic"
type CloneState = "initial" | "recording" | "uploaded" | "completed"

export default function VoiceBlessingApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("welcome")
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("humor")
  const [blessingText, setBlessingText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const [devices, setDevices] = useState([
    { id: "1", name: "智能音响-001", connected: false },
    { id: "2", name: "蓝牙耳机-Pro", connected: false },
    { id: "3", name: "语音盒子-Mini", connected: true },
  ])

  const [cloneState, setCloneState] = useState<CloneState>("initial")
  const [audioFileName, setAudioFileName] = useState("")
  const [testText, setTestText] = useState("")
  const [isSynthesizing, setIsSynthesizing] = useState(false)
  const [isCloning, setIsCloning] = useState(false)
  const [isAudioGenerated, setIsAudioGenerated] = useState(false)
  const [isPlayingGenerated, setIsPlayingGenerated] = useState(false)
  const [generatedProgress, setGeneratedProgress] = useState(0)

  const [isBlessingAudioSynthesizing, setIsBlessingAudioSynthesizing] = useState(false)
  const [blessingAudioSynthesized, setBlessingAudioSynthesized] = useState(false)
  const [isBlessingAudioPlaying, setIsBlessingAudioPlaying] = useState(false)
  const [blessingAudioProgress, setBlessingAudioProgress] = useState(0)

  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleGenerateBlessing = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const templates = {
      humor: "哈哈，生日快乐！愿你的年龄只是个数字，但银行卡余额是个天文数字！🎂",
      formal: "在这个特殊的日子里，谨致以最诚挚的祝福。愿您身体健康，工作顺利，阖家幸福。",
      poetic: "岁月如歌声悠扬，生辰如花香满堂。愿君此日心欢畅，来年更比今年强。",
    }
    setBlessingText(templates[selectedStyle])
    setIsGenerating(false)
  }

  const handleSynthesizeBlessingAudio = async () => {
    if (!blessingText.trim()) return
    setIsBlessingAudioSynthesizing(true)
    setBlessingAudioSynthesized(false)
    setIsBlessingAudioPlaying(false)
    setBlessingAudioProgress(0)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsBlessingAudioSynthesizing(false)
    setBlessingAudioSynthesized(true)
    setIsBlessingAudioPlaying(true)
  }

  const handleToggleBlessingAudioPlay = () => {
    setIsBlessingAudioPlaying((prev) => !prev)
  }

  const handleConnectDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, connected: !device.connected } : { ...device, connected: false },
      ),
    )
    setIsConnected(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setAudioFileName(file.name)
      setCloneState("uploaded")
      setIsAudioGenerated(false)
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
    }
  }

  const handleDeleteAudio = () => {
    setAudioFileName("")
    setCloneState("initial")
    setIsAudioGenerated(false)
    setIsPlaying(false)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
  }

  const handleDownloadAudio = () => {
    if (!audioUrl) return
    const link = document.createElement('a')
    link.href = audioUrl
    link.download = audioFileName || 'audio-file'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSynthesize = async () => {
    if (!testText.trim()) return
    setIsSynthesizing(true)
    setIsAudioGenerated(false)
    setIsPlayingGenerated(false)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSynthesizing(false)
    setIsAudioGenerated(true)
    setIsPlayingGenerated(true)
  }

  const handleStartCloning = async () => {
    if (!isAgreementChecked) return
    setIsCloning(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsCloning(false)
    setCloneState("completed")
    setIsPlayingGenerated(false)
  }

  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">语音祝福定制</h1>
          <p className="text-gray-600">≤60秒复刻声音，AI智能扩写祝福语</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>高保真声音复刻技术</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>多风格祝福语生成</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>蓝牙5.0一键传输</span>
          </div>
        </div>

        <Button
          onClick={() => setCurrentPage("clone")}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl text-lg font-medium"
        >
          开始创建祝福
        </Button>
      </div>
    </div>
  )

  const ConnectPage = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">设备连接</h2>
          <p className="text-gray-600">选择要传输语音的蓝牙设备</p>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                {isConnected ? (
                  <Bluetooth className="w-6 h-6 text-green-500" />
                ) : (
                  <Bluetooth className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-700">蓝牙连接状态</p>
            </div>
            <Button
              onClick={() => setIsConnected(!isConnected)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {isConnected ? "断开连接" : "连接设备"}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {device.connected ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-700">{device.name}</p>
              </div>
              <Button
                onClick={() => handleConnectDevice(device.id)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                {device.connected ? "断开连接" : "连接设备"}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setCurrentPage("clone")} className="flex-1">
            返回
          </Button>
          <Button
            onClick={() => setCurrentPage("play")}
            disabled={!isConnected}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
          >
            下一步
          </Button>
        </div>
      </div>
    </div>
  )

  const PlayPage = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">播放语音祝福</h2>
          <p className="text-gray-600">选择播放速度并播放您的语音祝福</p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {isPlaying ? <CustomPauseIcon className="w-6 h-6 text-gray-500" /> : <Play className="w-6 h-6 text-gray-500" />}
              </div>
              <p className="text-sm font-medium text-gray-700">播放状态</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 rounded-full h-2 relative mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${generatedProgress}%` }}
          />
        </div>

        <div className="text-center text-sm text-gray-500 mb-6">
          <span>00:00</span>
          <span className="mx-2">/</span>
          <span>00:10</span>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-lg font-medium"
          >
            {isPlaying ? (
              <>
                <CustomPauseIcon className="w-5 h-5 mr-2" />
                暂停播放
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                开始播放
              </>
            )}
          </Button>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setCurrentPage("connect")} className="flex-1">
            返回
          </Button>
          <Button onClick={() => setCurrentPage("welcome")} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
            完成
          </Button>
        </div>
      </div>
    </div>
  )

  // 直接渲染ClonePage内容，而不是使用函数组件
  const renderClonePage = () => {
    const renderTopSection = () => {
      if (cloneState === "completed") {
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">已复刻的声音</span>
              </div>

              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3"
                    disabled={!audioUrl}
                  >
                    {isPlaying ? (
                      <CustomPauseIcon className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{audioFileName || "你的专属声音"}</p>
                    <p className="text-xs text-gray-500">00:00/00:00</p>
                  </div>
                  <button
                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={handleDeleteAudio}
                  >
                    <Trash2 className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      } else if (cloneState === "uploaded") {
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                上传完成，<span className="text-purple-600">一键复刻</span>
              </h2>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 hover:bg-gray-200 transition-colors"
                  disabled={!audioUrl}
                >
                  {isPlaying ? (
                    <CustomPauseIcon className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-700 ml-0.5" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{audioFileName || "raohaiqing.m4a"}</p>
                  <p className="text-xs text-gray-500">00:00/00:00</p>
                </div>
                <div className="flex space-x-4">
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" 
                    onClick={handleDeleteAudio}
                    title="删除音频"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" 
                    onClick={handleDownloadAudio}
                    disabled={!audioUrl}
                    title="下载音频"
                  >
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" disabled>
                    <Volume2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleStartCloning}
                disabled={!isAgreementChecked || isCloning}
                className={`px-20 py-4 rounded-xl text-lg font-medium ${
                  isCloning
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                }`}
              >
                {isCloning ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    声音复刻中...
                  </>
                ) : (
                  "开始复刻"
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <Checkbox
                id="agreement"
                checked={isAgreementChecked}
                onCheckedChange={(checked) => setIsAgreementChecked(checked as boolean)}
              />
              <label htmlFor="agreement" className="text-xs text-gray-600 cursor-pointer">
                我已阅读并同意<span className="text-purple-600">《声音复刻服务协议》</span>
              </label>
            </div>
          </div>
        )
      } else {
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                录制或上传音频，<span className="text-purple-600">轻松复刻</span>
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed px-4 space-y-1">
                <p>推荐上传或录制10-30s音频，上传支持小于8M的wav、mp3、m4a格式文件，</p>
                <p>避免多人对话、明显杂音、噪音、混响等情况。</p>
              </div>
            </div>

            <div className="relative h-32 overflow-hidden rounded-xl bg-gradient-to-r from-purple-100/50 via-blue-100/50 to-pink-100/50">
              <div className="absolute left-1/4 top-0 bottom-0 flex items-center">
                <div className="flex items-end space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-blue-400/70 rounded-full"
                      style={{
                        height: `${Math.sin(i * 0.8) * 20 + 30}px`,
                        animationName: "pulse",
                        animationDuration: "1.5s",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg z-10">
                  <Mic className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="absolute right-1/4 top-0 bottom-0 flex items-center">
                <div className="flex items-end space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-blue-400/70 rounded-full"
                      style={{
                        height: `${Math.sin(i * 0.8) * 20 + 30}px`,
                        animationName: "pulse",
                        animationDuration: "1.5s",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="file" accept="audio/*" className="hidden" id="audio-upload" onChange={handleFileUpload} />
                <label
                  htmlFor="audio-upload"
                  className="flex items-center justify-center h-14 px-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all group w-full"
                >
                  <Upload className="w-5 h-5 text-gray-500 group-hover:text-purple-600 mr-2" />
                  <span className="text-base font-medium text-gray-700 group-hover:text-purple-600">上传声音</span>
                </label>
              </div>

              <div>
                <label className="flex items-center justify-center h-14 px-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all group w-full">
                  <Mic className="w-5 h-5 text-gray-500 group-hover:text-purple-600 mr-2" />
                  <span className="text-base font-medium text-gray-700 group-hover:text-purple-600">
                    开始录制
                  </span>
                </label>
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8">{renderTopSection()}</div>

          {cloneState !== "completed" && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-600">2</span>
                </div>
                <span className="text-sm font-medium text-gray-700">输入文本，试听声音</span>
              </div>

              <div
                className={`bg-white rounded-xl p-4 border border-gray-100 relative ${cloneState === "initial" ? "bg-gray-50 cursor-not-allowed" : ""}`}
              >
                <Textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="请在此处输入声音复刻后，希望听到的文本"
                  className={`min-h-[80px] resize-none border-none p-0 focus-visible:ring-0 focus:outline-none focus:ring-0 focus:border-transparent text-sm ${cloneState === "initial" ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}`}
                  disabled={cloneState === "initial"}
                />
                {cloneState === "initial" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-not-allowed">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {cloneState === "completed" && (
                <div className="space-y-4">
                  <Button
                    onClick={handleSynthesize}
                    disabled={!testText.trim() || isSynthesizing}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
                  >
                    {isSynthesizing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        合成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        合成试听
                      </>
                    )}
                  </Button>

                  {isAudioGenerated && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setIsPlayingGenerated(!isPlayingGenerated)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          {isPlayingGenerated ? (
                            <CustomPauseIcon className="w-4 h-4 text-gray-700" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${generatedProgress}%` }}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">00:00</span>
                          <span className="text-xs text-gray-400">/</span>
                          <span className="text-xs text-gray-500">00:10</span>
                        </div>

                        <Volume2 className="w-4 h-4 text-gray-500" />
                      </div>

                      <div className="mt-2 text-xs text-gray-500 text-right">
                        本次消耗38/300字符额度，还有20000/20000字符额度
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 祝福语编辑内容 - 临时显示以测试输入功能 */}
          {(cloneState === "completed" || true) && (
            <div className="space-y-6 mb-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">祝福语编辑</h2>
                <p className="text-gray-600">选择风格，AI为您扩写个性化祝福语</p>
              </div>

              {/* 风格选择器 */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { key: "humor", label: "幽默风趣", icon: "😄", color: "from-yellow-400 to-orange-500" },
                  { key: "formal", label: "正式庄重", icon: "🎩", color: "from-blue-400 to-indigo-500" },
                  { key: "poetic", label: "诗意浪漫", icon: "🌸", color: "from-pink-400 to-purple-500" },
                ].map((style) => (
                  <Card
                    key={style.key}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedStyle === style.key ? "ring-2 ring-pink-500 shadow-lg" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedStyle(style.key as StyleType)}
                  >
                    <div className="text-center space-y-2">
                      <div
                        className={`w-12 h-12 mx-auto bg-gradient-to-r ${style.color} rounded-full flex items-center justify-center text-white text-xl`}
                      >
                        {style.icon}
                      </div>
                      <p className="text-sm font-medium text-gray-700">{style.label}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* 祝福语编辑区域 */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">祝福语内容</h3>
                    <div className="flex space-x-2">
                      <Button
                        onClick={
                          isBlessingAudioSynthesizing
                            ? undefined
                            : blessingAudioSynthesized
                              ? handleToggleBlessingAudioPlay
                              : handleSynthesizeBlessingAudio
                        }
                        disabled={!blessingText.trim() || isGenerating || isBlessingAudioSynthesizing}
                        size="sm"
                        className={`
                          ${
                            blessingAudioSynthesized
                              ? "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          }
                          ${
                            !blessingText.trim() || isGenerating || isBlessingAudioSynthesizing
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        `}
                      >
                        {isBlessingAudioSynthesizing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            合成中...
                          </>
                        ) : blessingAudioSynthesized ? (
                          <>
                            {isBlessingAudioPlaying ? (
                              <CustomPauseIcon className="w-4 h-4 mr-2" />
                            ) : (
                              <Play className="w-4 h-4 mr-2" />
                            )}
                            试听语音
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            合成语音
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={handleGenerateBlessing}
                        disabled={isGenerating}
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            生成中...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            AI扩写
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 使用最简单的文本输入组件 */}
                  <Textarea
                    value={blessingText}
                    onChange={(e) => setBlessingText(e.target.value)}
                    placeholder="输入简单的祝福语，AI将为您扩写..."
                    className="min-h-[120px] resize-none"
                  />

                  <div className="text-xs text-gray-500 text-right">{blessingText.length}/200字</div>

                  {blessingAudioSynthesized && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100 mt-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleToggleBlessingAudioPlay}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          {isBlessingAudioPlaying ? (
                            <CustomPauseIcon className="w-4 h-4 text-gray-700" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${blessingAudioProgress}%` }}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {Math.floor((blessingAudioProgress / 100) * 10)
                              .toString()
                              .padStart(2, "0")}
                            :
                            {Math.floor(
                              ((blessingAudioProgress / 100) * 10 - Math.floor((blessingAudioProgress / 100) * 10)) *
                                60,
                            )
                              .toString()
                              .padStart(2, "0")}
                          </span>
                          <span className="text-xs text-gray-400">/</span>
                          <span className="text-xs text-gray-500">00:10</span>
                        </div>

                        <Volume2 className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setCurrentPage("welcome")} className="flex-1">
              返回
            </Button>
            {cloneState === "completed" && (
              <Button
                onClick={() => setCurrentPage("connect")}
                disabled={!blessingText.trim() || !blessingAudioSynthesized}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
              >
                发送到贺卡
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {currentPage === "welcome" && <WelcomePage />}
      {currentPage === "clone" && renderClonePage()}
      {currentPage === "connect" && <ConnectPage />}
      {currentPage === "play" && <PlayPage />}
    </div>
  )
}
