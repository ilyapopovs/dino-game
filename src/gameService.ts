/*
 * Functions for handling game logic
 */

import { GRAVITY, PLAYER_BASE_Y } from './main'

export function recalculatePlayerState(playerState: any) {
  playerState.y = Math.min(playerState.y - playerState.speed, PLAYER_BASE_Y)
  playerState.speed = playerState.speed - GRAVITY
}
