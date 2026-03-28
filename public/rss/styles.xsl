<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> – RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f6f6f9;
            color: #1a1a2e;
            line-height: 1.6;
          }
          a { color: #5b21b6; text-decoration: none; }
          a:hover { text-decoration: underline; }

          .header {
            background: #1a1a2e;
            color: #fff;
            padding: 2rem 1.5rem;
          }
          .header__inner {
            max-width: 860px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 1.25rem;
          }
          .header__logo {
            width: 48px;
            height: 48px;
            background: #5b21b6;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .header__logo svg { width: 28px; height: 28px; fill: #fff; }
          .header__text h1 { font-size: 1.5rem; font-weight: 700; }
          .header__text p { font-size: 0.9rem; color: #a5b4fc; margin-top: 0.25rem; }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #5b21b6;
            color: #fff;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 0.25rem 0.6rem;
            border-radius: 999px;
            margin-top: 0.5rem;
          }
          .badge svg { width: 10px; height: 10px; fill: #fff; }

          .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; }

          .notice {
            background: #ede9fe;
            border: 1px solid #c4b5fd;
            border-radius: 8px;
            padding: 1rem 1.25rem;
            font-size: 0.875rem;
            color: #4c1d95;
            margin-bottom: 2rem;
          }

          .posts { display: flex; flex-direction: column; gap: 1rem; }

          .post {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 1.5rem;
            transition: box-shadow 0.15s;
          }
          .post:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
          .post__title { font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
          .post__title a { color: inherit; }
          .post__title a:hover { color: #5b21b6; text-decoration: none; }
          .post__meta {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            font-size: 0.8rem;
            color: #6b7280;
            margin-top: 0.4rem;
          }
          .post__description { font-size: 0.9rem; color: #4b5563; margin-top: 0.75rem; }
          .post__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem; }
          .tag {
            background: #ede9fe;
            color: #5b21b6;
            font-size: 0.72rem;
            font-weight: 500;
            padding: 0.2rem 0.55rem;
            border-radius: 999px;
          }
          .footer {
            text-align: center;
            font-size: 0.8rem;
            color: #9ca3af;
            padding: 2rem 1.5rem;
            border-top: 1px solid #e5e7eb;
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header__inner">
            <div class="header__logo">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <div class="header__text">
              <h1><xsl:value-of select="/rss/channel/title"/></h1>
              <p><xsl:value-of select="/rss/channel/description"/></p>
              <span class="badge">
                <svg viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/></svg>
                RSS Feed
              </span>
            </div>
          </div>
        </div>

        <div class="container">
          <p class="notice">
            This is an RSS feed. Subscribe by copying the URL into your favourite RSS reader,
            or paste it into a service like <a href="https://feedly.com" target="_blank">Feedly</a>
            or <a href="https://www.inoreader.com" target="_blank">Inoreader</a>.
          </p>

          <div class="posts">
            <xsl:for-each select="/rss/channel/item">
              <div class="post">
                <div class="post__title">
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                    <xsl:attribute name="target">_blank</xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </div>
                <div class="post__meta">
                  <xsl:if test="pubDate">
                    <span>&#128197; <xsl:value-of select="pubDate"/></span>
                  </xsl:if>
                  <xsl:if test="author">
                    <span>&#9997;&#65039; <xsl:value-of select="author"/></span>
                  </xsl:if>
                </div>
                <xsl:if test="description">
                  <p class="post__description"><xsl:value-of select="description"/></p>
                </xsl:if>
                <xsl:if test="category">
                  <div class="post__tags">
                    <xsl:for-each select="category">
                      <span class="tag"><xsl:value-of select="."/></span>
                    </xsl:for-each>
                  </div>
                </xsl:if>
              </div>
            </xsl:for-each>
          </div>
        </div>

        <div class="footer">
          <p>&#169; Timefold · <a href="https://timefold.ai" target="_blank">timefold.ai</a></p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
