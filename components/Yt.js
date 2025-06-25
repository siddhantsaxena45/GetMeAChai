const YouTubeEmbed = () => {
  return (

    <iframe
      className="w-full h-full aspect-video"
      src="https://www.youtube.com/embed/XIXHhhV5mgM?si=DTtLbe1P8pTcgjaV"
      title="YouTube video player"
     
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>


  );
};

export default YouTubeEmbed;
