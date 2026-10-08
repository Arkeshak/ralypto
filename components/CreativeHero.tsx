import { labs } from "@/lib/content";
/* Path to an MP4 showreel in /public once you have one, e.g. "/showreel.mp4" */ const SHOWREEL:
  string | null = null;
/* Text on the left, artwork on the right: the title never sits on top of the video or shapes. */ export default function CreativeHero() {
  return (
    <div className="cr-hero">
      {" "}
      <div className="cr-hero__text">
        {" "}
        <h1 className="cr-hero__title">
          {" "}
          <span>Creative</span> <span>Studio</span>{" "}
        </h1>{" "}
        <p className="cr-hero__promise">{labs.creative.promise}</p>{" "}
        <ul className="cr-hero__tags">
          {" "}
          <li>Branding</li>
          <li>Video</li>
          <li>Photo</li>
          <li>Social media</li>
          <li>Ads</li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="cr-hero__art">
        {" "}
        {SHOWREEL ? (
          <video
            className="cr-hero__video"
            src={SHOWREEL}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="cr-hero__riso" aria-hidden="true">
            {" "}
            <span className="riso__shape riso__shape--a" />{" "}
            <span className="riso__shape riso__shape--b" />{" "}
            <span className="riso__shape riso__shape--c" />{" "}
            <span className="cr-hero__sticker">Now booking</span>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
