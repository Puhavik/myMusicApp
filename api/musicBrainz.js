import axios from 'axios';

const musicBrainzApi = axios.create({
    baseURL: 'https://musicbrainz.org/ws/2/',
    headers: { 'User-Agent': 'MyA2App/1.0.0 ( your-email@example.com )' },
});

const coverArtApi = axios.create({
    baseURL: 'https://coverartarchive.org/',
});

export async function searchArtist(name) {
    const response = await musicBrainzApi.get(`artist?query=${encodeURIComponent(name)}&fmt=json`);
    return response.data;
}

export async function getArtist(mbid) {
    const response = await musicBrainzApi.get(`artist/${mbid}?inc=release-groups&fmt=json`);
    const artist = response.data;

    const releaseGroupsWithCoverArt = await Promise.all(
        artist['release-groups'].map(async (releaseGroup) => {
            try {
                const coverArtResponse = await coverArtApi.get(`release-group/${releaseGroup.id}`);
                return {
                    ...releaseGroup,
                    imageUrl: coverArtResponse.data.images[0].thumbnails.small,
                };
            } catch (error) {
                return { ...releaseGroup, imageUrl: null };
            }
        })
    );

    return { ...artist, 'release-groups': releaseGroupsWithCoverArt };
}