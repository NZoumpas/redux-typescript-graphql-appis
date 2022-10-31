import React from "react";
import styled from "styled-components";
import { createSelector } from "reselect";
import { useAppSelector } from "../../hooks";
import { makeSelectAnimePage } from "./selectors";

const HotAnimeContainer = styled.div`
	max-width: 1200px;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
`;
const AnimeItemContainer = styled.div`
	width: 12em;
	height: 16em;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AnimeCover = styled.div`
	width: auto;
	height: 15em;
	img {
		width: auto;
		height: 100%;
	}
`;

const AnimeTitle = styled.h6`
	font-size: 19px;
	color: #000;
	font-weight: 600;
`;

const stateSelector = createSelector(makeSelectAnimePage, (animePage) => ({
	animePage,
}));

export function HotAnime() {
	const { animePage } = useAppSelector(stateSelector);

	const isEmptyAnimePage =
		!animePage || !animePage.media || animePage.media.length === 0;
	if (isEmptyAnimePage) return null;
	return (
		<HotAnimeContainer>
			{animePage &&
				animePage.media &&
				animePage.media.map((anime) => (
					<AnimeItemContainer key={anime?.id}>
						<AnimeCover>
							<img src={anime?.coverImage?.extraLarge || ""} />
						</AnimeCover>
						<AnimeTitle>{anime?.title?.english}</AnimeTitle>
					</AnimeItemContainer>
				))}
		</HotAnimeContainer>
	);
}
