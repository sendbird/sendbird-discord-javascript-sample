export let colors

;(function(colors) {
  colors["navy50"] = "#f6f8fc"
  colors["navy80"] = "#eef2fa"
  colors["navy100"] = "#dee2f2"
  colors["navy200"] = "#c9d0e6"
  colors["navy300"] = "#b6bdd7"
  colors["navy400"] = "#8a92ba"
  colors["navy600"] = "#595e8a"
  colors["navy800"] = "#353761"
  colors["navy900"] = "#212242"
  colors["white"] = "#ffffff"
  colors["purple50"] = "#ededff"
  colors["purple300"] = "#825eeb"
  colors["purple400"] = "#6440c4"
  colors["green300"] = "#1fcca1"
  colors["green400"] = "#00998c"
  colors["green500"] = "#007a7a"
  colors["red300"] = "#f24d6b"
  colors["red400"] = "#d92148"
  colors["mutegray"] = "rgba(168, 168, 168, 0.38)"
})(colors || (colors = {}))

export let MEDIA_SIZES

;(function(MEDIA_SIZES) {
  MEDIA_SIZES[(MEDIA_SIZES["desktop"] = 992)] = "desktop"
  MEDIA_SIZES[(MEDIA_SIZES["tablet"] = 640)] = "tablet"
  MEDIA_SIZES[(MEDIA_SIZES["main"] = 377)] = "main"
  MEDIA_SIZES[(MEDIA_SIZES["mobile"] = 320)] = "mobile"
})(MEDIA_SIZES || (MEDIA_SIZES = {}))

export function getCallOption(callOption) {
  return {
    localMediaView: undefined,
    remoteMediaView: undefined,
    videoEnabled: true,
    audioEnabled: true,
    ...callOption
  }
}
