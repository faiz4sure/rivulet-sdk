import type { 
    HomePageResult, 
    HomePageSection, 
    SearchResult, 
    LoadResult,
    EpisodeDetail,
    MediaType,
    ActorData,
    TrailerData,
    StreamLink,
    Subtitle,
    StreamResult
} from "../types.ts";

export class SearchResultBuilder {
    private result: Partial<SearchResult> = {};

    setId(id: number): this {
        this.result.id = id;
        return this;
    }

    setTitle(title: string): this {
        this.result.title = title;
        return this;
    }

    setUrl(url: string): this {
        this.result.url = url;
        return this;
    }

    setApiName(apiName: string): this {
        this.result.apiName = apiName;
        return this;
    }

    setPoster(posterUrl: string): this {
        this.result.posterUrl = posterUrl;
        return this;
    }

    setQuality(quality: string | number): this {
        this.result.quality = String(quality);
        return this;
    }

    setYear(year: number): this {
        this.result.year = year;
        return this;
    }
    
    setType(type: MediaType): this {
        this.result.type = type;
        return this;
    }

    build(): SearchResult {
        if (this.result.title === undefined || !this.result.url || !this.result.apiName) {
            throw new Error("SearchResult requires at least title, url, and apiName.");
        }
        return this.result as SearchResult;
    }
}

export class HomePageBuilder {
    private sections: HomePageSection[] = [];
    private hasNextPage?: boolean;

    addSection(title: string, items: SearchResult[], isHorizontalImages = false): this {
        this.sections.push({
            title,
            items,
            isHorizontalImages
        });
        return this;
    }

    setHasNextPage(hasNextPage: boolean): this {
        this.hasNextPage = hasNextPage;
        return this;
    }

    build(): HomePageResult {
        const result: HomePageResult = { sections: this.sections };
        if (this.hasNextPage !== undefined) {
            result.hasNextPage = this.hasNextPage;
        }
        return result;
    }
}

export class EpisodeBuilder {
    private episode: Partial<EpisodeDetail> = {};

    setTitle(title: string): this {
        this.episode.title = title;
        return this;
    }

    setUrl(url: string): this {
        this.episode.url = url;
        return this;
    }

    setNumber(num: number): this {
        this.episode.number = num;
        return this;
    }

    setSeason(season: number): this {
        this.episode.season = season;
        return this;
    }
    
    setPoster(posterUrl: string): this {
        this.episode.posterUrl = posterUrl;
        return this;
    }

    setSeasonIndex(seasonIndex: number): this {
        this.episode.seasonIndex = seasonIndex;
        return this;
    }

    setDescription(description: string): this {
        this.episode.description = description;
        return this;
    }

    setScore(score: number): this {
        this.episode.score = score;
        return this;
    }

    setIsFiller(isFiller: boolean): this {
        this.episode.isFiller = isFiller;
        return this;
    }

    setAirDate(airDate: number): this {
        this.episode.airDate = airDate;
        return this;
    }

    setRunTime(runTime: string | number): this {
        this.episode.runTime = runTime;
        return this;
    }

    build(): EpisodeDetail {
        if (!this.episode.url) {
            throw new Error("Episode requires a url.");
        }
        return this.episode as EpisodeDetail;
    }
}

export class LoadResultBuilder {
    private result: Partial<LoadResult> = {};
    private episodes: EpisodeDetail[] = [];

    setTitle(title: string): this {
        this.result.title = title;
        return this;
    }

    setUrl(url: string): this {
        this.result.url = url;
        return this;
    }

    setApiName(apiName: string): this {
        this.result.apiName = apiName;
        return this;
    }

    setType(type: MediaType): this {
        this.result.type = type;
        return this;
    }

    setPoster(posterUrl: string): this {
        this.result.posterUrl = posterUrl;
        return this;
    }
    
    setBackgroundPoster(bgUrl: string): this {
        this.result.backgroundPosterUrl = bgUrl;
        return this;
    }

    setPlot(plot: string): this {
        this.result.plot = plot;
        return this;
    }

    setYear(year: number): this {
        this.result.year = year;
        return this;
    }

    setScore(score: number): this {
        this.result.score = score;
        return this;
    }

    setDuration(duration: string | number): this {
        this.result.duration = duration;
        return this;
    }

    setGenres(genres: string[]): this {
        this.result.genres = genres;
        return this;
    }

    setUniqueUrl(uniqueUrl: string): this {
        this.result.uniqueUrl = uniqueUrl;
        return this;
    }

    setLogoUrl(logoUrl: string): this {
        this.result.logoUrl = logoUrl;
        return this;
    }

    setPosterHeaders(headers: Record<string, string>): this {
        this.result.posterHeaders = headers;
        return this;
    }

    setContentRating(contentRating: string): this {
        this.result.contentRating = contentRating;
        return this;
    }

    setComingSoon(comingSoon: boolean): this {
        this.result.comingSoon = comingSoon;
        return this;
    }

    setActors(actors: ActorData[]): this {
        this.result.actors = actors;
        return this;
    }

    setTrailers(trailers: TrailerData[]): this {
        this.result.trailers = trailers;
        return this;
    }

    setRecommendations(recommendations: SearchResult[]): this {
        this.result.recommendations = recommendations;
        return this;
    }

    setSyncData(syncData: Record<string, string>): this {
        this.result.syncData = syncData;
        return this;
    }

    addEpisodes(episodes: EpisodeDetail[]): this {
        this.episodes.push(...episodes);
        return this;
    }

    build(): LoadResult {
        if (this.result.title === undefined || !this.result.url || !this.result.apiName) {
            throw new Error("LoadResult requires at least title, url, and apiName.");
        }
        if (this.episodes.length > 0) {
            this.result.episodes = this.episodes;
        }
        return this.result as LoadResult;
    }
}

export class StreamBuilder {
    private stream: Partial<StreamLink> = {};

    setTitle(title: string): this {
        this.stream.title = title;
        return this;
    }

    setUrl(url: string): this {
        this.stream.url = url;
        return this;
    }

    setQuality(quality: number): this {
        this.stream.quality = quality;
        return this;
    }

    setIsM3u8(isM3u8: boolean): this {
        this.stream.isM3u8 = isM3u8;
        return this;
    }

    setHeaders(headers: Record<string, string>): this {
        this.stream.headers = headers;
        return this;
    }

    build(): StreamLink {
        if (!this.stream.url || !this.stream.title || this.stream.isM3u8 === undefined) {
            throw new Error("StreamLink requires at least title, url, and isM3u8.");
        }
        return this.stream as StreamLink;
    }
}

export class SubtitleBuilder {
    private subtitle: Partial<Subtitle> = {};

    setLanguage(language: string): this {
        this.subtitle.language = language;
        return this;
    }

    setUrl(url: string): this {
        this.subtitle.url = url;
        return this;
    }

    setHeaders(headers: Record<string, string>): this {
        this.subtitle.headers = headers;
        return this;
    }

    build(): Subtitle {
        if (!this.subtitle.language || !this.subtitle.url) {
            throw new Error("Subtitle requires language and url.");
        }
        return this.subtitle as Subtitle;
    }
}

export class StreamResultBuilder {
    private streams: StreamLink[] = [];
    private subtitles: Subtitle[] = [];

    addStream(stream: StreamLink): this {
        this.streams.push(stream);
        return this;
    }

    addSubtitle(subtitle: Subtitle): this {
        this.subtitles.push(subtitle);
        return this;
    }

    build(): StreamResult {
        const result: StreamResult = { streams: this.streams };
        if (this.subtitles.length > 0) {
            result.subtitles = this.subtitles;
        }
        return result;
    }
}
