import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text, voiceId } = await request.json();

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.8,
            similarity_boost: 1,
            use_speaker_boost: true,
            style: 0.45,
          },
        }),
      }
    );

    const audioBlob = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBlob).toString("base64");

    return NextResponse.json({ url: `data:audio/mpeg;base64,${audioBase64}` });
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
