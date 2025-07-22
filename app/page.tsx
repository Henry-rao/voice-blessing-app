"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  Mic,
  Play,
  Pause,
  Bluetooth,
  Wand2,
  Heart,
  Sparkles,
  Volume2,
  RotateCcw,
  Send,
  Wifi,
  WifiOff,
  CheckCircle,
  Loader2,
} from "lucide-react"

type PageType = "welcome" | "clone" | "edit" | "connect" | "play"
type StyleType = "humor" | "formal" | "poetic"

export default function VoiceBlessingApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("welcome")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("humor")
  const [blessingText, setBlessingText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState([1])
  const [devices, setDevices] = useState([
    { id: "1", name: "智能音响-001", connected: false },
    { id: "2", name: "蓝牙耳机-Pro", connected: false },
    { id: "3", name: "语音盒子-Mini", connected: true },
  ])

  // 录音计时器
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            setIsRecording(false)
            return 60
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  const handleGenerateBlessing = async () => {
    setIsGenerating(true)
    // 模拟AI生成过程
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const templates = {
      humor: "哈哈，生日快乐！愿你的年龄只是个数字，但银行卡余额是个天文数字！🎂",
      formal: "在这个特殊的日子里，谨致以最诚挚的祝福。愿您身体健康，工作顺利，阖家幸福。",
      poetic: "岁月如歌声悠扬，生辰如花香满堂。愿君此日心欢畅，来年更比今年强。",
    }

    setBlessingText(templates[selectedStyle])
    setIsGenerating(false)
  }

  const handleConnectDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, connected: !device.connected } : { ...device, connected: false },
      ),
    )
    setIsConnected(true)
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
          <p className="text-gray-600">≤60秒克隆声音，AI智能扩写祝福语</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>高保真声音克隆技术</span>
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

  const ClonePage = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">声音克隆</h2>
          <p className="text-gray-600">录制60秒语音，AI将学习您的声音特征</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="text-center space-y-6">
            {/* 波形可视化区域 */}
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isRecording ? (
                <div className="flex items-center space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-pink-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 60 + 20}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">
                  <Mic className="w-12 h-12 mx-auto mb-2" />
                  <p>点击开始录音</p>
                </div>
              )}
            </div>

            {/* 录音控制 */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <Button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-20 h-20 rounded-full ${
                    isRecording ? "bg-red-500 hover:bg-red-600" : "bg-pink-500 hover:bg-pink-600"
                  } text-white`}
                >
                  {isRecording ? <div className="w-6 h-6 bg-white rounded-sm" /> : <Mic className="w-8 h-8" />}
                </Button>
              </div>

              {/* 添加上传音频文件按钮 */}
              <div className="flex justify-center">
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  id="audio-upload"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      // 模拟文件上传处理
                      setRecordingTime(30) // 假设上传的音频是30秒
                    }
                  }}
                />
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer text-sm text-pink-600 hover:text-pink-700 underline"
                >
                  或上传音频文件
                </label>
              </div>

              {/* 参考文本显示 */}
              {isRecording && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium mb-2">请朗读以下参考文本：</p>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    "今天天气真不错，阳光明媚，微风轻拂。我想对你说，生日快乐！愿你每天都开开心心，工作顺利，身体健康。希望我们的友谊能够长长久久，一起度过更多美好的时光。"
                  </p>
                </div>
              )}

              {/* 进度条 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{recordingTime}s</span>
                  <span>60s</span>
                </div>
                <Progress value={(recordingTime / 60) * 100} className="h-2" />
              </div>

              {recordingTime > 0 && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    {recordingTime < 10 && "继续录音，获得更好的克隆效果"}
                    {recordingTime >= 10 && recordingTime < 30 && "录音质量良好"}
                    {recordingTime >= 30 && "录音质量优秀！"}
                  </div>

                  {/* 添加试听按钮 */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-pink-600 border-pink-200 hover:bg-pink-50 bg-transparent"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      试听录音
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setCurrentPage("welcome")} className="flex-1">
            返回
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage("edit")}
            className="flex-1 text-gray-600 hover:text-gray-700"
          >
            已有现成声音，跳过
          </Button>
          <Button
            onClick={() => setCurrentPage("edit")}
            disabled={recordingTime < 5}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
          >
            下一步
          </Button>
        </div>
      </div>
    </div>
  )

  const EditPage = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">祝福语编辑</h2>
          <p className="text-gray-600">选择风格，AI为您扩写个性化祝福语</p>
        </div>

        {/* 风格选择 */}
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

        {/* 祝福语输入/生成区域 */}
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">祝福语内容</h3>
              <div className="flex space-x-2">
                {blessingText.trim() && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    试听语音
                  </Button>
                )}
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

            <Textarea
              value={blessingText}
              onChange={(e) => setBlessingText(e.target.value)}
              placeholder="输入简单的祝福语，AI将为您扩写..."
              className="min-h-[120px] resize-none"
              onFocus={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="text-xs text-gray-500 text-right">{blessingText.length}/200字</div>
          </div>
        </Card>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setCurrentPage("clone")} className="flex-1">
            返回
          </Button>
          <Button
            onClick={() => setCurrentPage("connect")}
            disabled={!blessingText.trim()}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
          >
            生成语音
          </Button>
        </div>
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

        {/* 蓝牙状态 */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bluetooth className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">蓝牙连接</p>
                <p className="text-sm text-gray-600">正在搜索设备...</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </Card>

        {/* 设备列表 */}
        <div className="space-y-3 mb-6">
          {devices.map((device) => (
            <Card
              key={device.id}
              className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                device.connected ? "ring-2 ring-green-500 bg-green-50" : ""
              }`}
              onClick={() => handleConnectDevice(device.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      device.connected ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {device.connected ? (
                      <Wifi className="w-5 h-5 text-green-600" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{device.name}</p>
                    <p className="text-sm text-gray-600">{device.connected ? "已连接" : "点击连接"}</p>
                  </div>
                </div>
                {device.connected && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setCurrentPage("edit")} className="flex-1">
            返回
          </Button>
          <Button
            onClick={() => setCurrentPage("play")}
            disabled={!isConnected}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
          >
            开始播放
          </Button>
        </div>
      </div>
    </div>
  )

  const PlayPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">播放控制</h2>
          <p className="text-gray-600">您的专属语音祝福已准备就绪</p>
        </div>

        {/* 3D旋转唱片UI */}
        <div className="relative mb-8">
          <div
            className={`w-64 h-64 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "3s" }}
          >
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* 播放按钮 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl text-pink-500 hover:text-pink-600"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>
        </div>

        {/* 控制面板 */}
        <Card className="p-6 mb-6">
          <div className="space-y-6">
            {/* 语速控制 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">语速调节</label>
                <span className="text-sm text-gray-600">{playbackSpeed[0]}x</span>
              </div>
              <Slider
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* 音量控制 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">音量</label>
                <Volume2 className="w-4 h-4 text-gray-600" />
              </div>
              <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
            </div>

            {/* 祝福语预览 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">祝福语内容</label>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                {blessingText || "您的个性化祝福语将在这里显示..."}
              </div>
            </div>
          </div>
        </Card>

        {/* 操作按钮 */}
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3">
            <Send className="w-5 h-5 mr-2" />
            发送到设备
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setCurrentPage("connect")} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              重新录制
            </Button>
            <Button variant="outline" onClick={() => setCurrentPage("welcome")} className="flex-1">
              完成
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "welcome":
        return <WelcomePage />
      case "clone":
        return <ClonePage />
      case "edit":
        return <EditPage />
      case "connect":
        return <ConnectPage />
      case "play":
        return <PlayPage />
      default:
        return <WelcomePage />
    }
  }

  return <div className="min-h-screen">{renderCurrentPage()}</div>
}
