import React from 'react'
import Encounter from './Encounter'
import Combatants from './Combatants'
import { withHelper } from './helpers'

import './css/reboot.css'
import './css/index.css'
import './css/overlay.css'

// From MopiMopi
const smnPetsList = ["카벙클 에메랄드", "カーバンクル・エメラルド", "绿宝石兽", "Smaragd-Karfunkel", "Carbuncle émeraude", "Emerald Carbuncle",
  "카벙클 토파즈", "カーバンクル・トパーズ", "黄宝石兽", "Topas-Karfunkel", "Carbuncle topaze", "Topaz Carbuncle",
  "카벙클 루비", "カーバンクル・ルビー", "红宝石兽", "Rubin-Karfunkel", "Carbuncle rubis", "Ruby Carbuncle",
  "가루다 에기", "ガルーダ・エギ", "迦楼罗之灵", "Garuda-Egi",
  "이프리트 에기", "イフリート・エギ", "伊弗利特之灵", "Ifrit-Egi",
  "타이탄 에기", "タイタン・エギ", "泰坦之灵", "Titan-Egi",
  "데미바하무트", "デミ・バハムート", "亚灵神巴哈姆特", "Demi-Bahamut", "デミ・フェニックス",
  "데미피닉스", "Demi-Phönix", "Demi-Phénix", "Demi-Phoenix", "亚灵神不死鸟"
];
const mchPetsList = ["자동포탑 룩", "オートタレット・ルーク", "车式浮空炮塔", "Selbstschuss-Gyrocopter Turm", "Auto-tourelle Tour", "Rook Autoturret",
  "자동포탑 비숍", "オートタレット・ビショップ", "象式浮空炮塔", "Selbstschuss-Gyrocopter Läufer", "Auto-tourelle Fou", "Bishop Autoturret",
  "オートマトン・クイーン", "Automaton Dame", "Automate Reine", "Automaton Queen", "后式自走人偶", "자동인형 퀸"
];
const schPetsList = ["요정 에오스", "フェアリー・エオス", "朝日小仙女", "Eos",
  "요정 셀레네", "フェアリー・セレネ", "夕月小仙女", "Selene",
  "セラフィム", "Seraph", "Séraphin", "炽天使", "세라핌"
];
const drkPetsList = ["영웅의 환영", "英雄の影身", "Hochachtung", "Estime", "Esteem", "英雄的掠影"];
const ninPetsList = ["分身", "Gedoppeltes Ich", "Ombre", "Bunshin", "분신"];
const astPetsList = ["지상의 별", "アーサリースター", "地星", "Earthly Star", "Étoile terrestre", "Irdischer Stern"];
const petRegex = /(.*?) \((.*?)\)/im;

class OverlayRaw extends React.Component {
  state = {
    limitBreak: 0,
    discordData: [],
    combatants: {}
  }
  handleLimitBreak = value => {
    this.setState({ limitBreak: value })
  }
  componentWillReceiveProps(nextProps) {
    if (Object.getOwnPropertyNames(this.props.Combatant).length === 0)
      return false

    let combatants = this.props.Combatant;
    let maxRows = this.props.config.maxCombatants
    let dataArray = Object.keys(this.props.Combatant)
    let battler = dataArray.slice(0, maxRows)
    let combatant
    let discordData = []

    if (this.props.config.combinePets) {
      const possiblyPets = dataArray.filter(player => (
          combatants[player].name.toLowerCase() !== 'limit break'
          && (!combatants[player].Job || combatants[player].Job === '') // pets don't have jobs
          && (combatants[player].ENCDPS > 0 || combatants[player].ENCHPS > 0) //irrelevant npcs (i.e. estinien) like to show up for whatever reason
      ));

      for (const ref in possiblyPets) {
        const combatant = combatants[dataArray[ref]];
        const matches = combatant.name.match(petRegex);
        if (petRegex.test(combatant.name)) {
          const petName = matches[1];
          let combatantName = matches[2];
          if (smnPetsList.indexOf(petName) > -1
              || schPetsList.indexOf(petName) > -1
              || mchPetsList.indexOf(petName) > -1
              || drkPetsList.indexOf(petName) > -1
              || ninPetsList.indexOf(petName) > -1
              || astPetsList.indexOf(petName) > -1) {
            if (!(combatantName in combatants)) {
              combatantName = 'YOU';
            }

            if (!("pets" in combatants[combatantName])) {
              combatants[combatantName].pets = [combatant];
            } else {
              combatants[combatantName].pets.push(combatant);
            }
          }
        }
      }
    }

    for (const ref in battler) {
      combatant = this.props.Combatant[battler[ref]]

      // Send to Discord the right name in Settings
      if (combatant.name.toUpperCase() === 'YOU')
        combatant.name = this.props.config.characterName

      // Send limit break data separated
      if (combatant.name.toLowerCase() === 'limit break') {
        this.handleLimitBreak(
          parseInt(
            this.props.Combatant.damage / this.props.Encounter.damage * 100,
            10
          )
        )
        break
      }

      discordData.push({
        job: combatant.Job,
        characterName: combatant.name,
        dps: combatant.ENCDPS,
        damage: parseInt(
          combatant.damage / this.props.Encounter.damage * 100,
          10
        ),
        hps: combatant.ENCHPS,
        healed: combatant['healed%'],
        deaths: combatant.deaths,
        crit: combatant['crithit%'],
        dhit: combatant.DirectHitPct,
        pets: ("pets" in combatant ? combatant.pets : [])
        // maxhit: combatant.maxhit.split('-')
      })
    }
    this.setState({ discordData })
    this.setState({ combatants });
  }
  render() {
    const props = this.props
    return (
      <div
        className={`damage-meter${props.isActive ? '' : ' inactive'}${
          props.config.locale === 'zhCN' || props.config.locale === 'zhHK'
            ? ' chinese'
            : ''
        }`}
        onContextMenu={props.openConfig}
        style={{ zoom: props.config.zoom }}
      >
        <Combatants
          data={this.state.combatants}
          encounterDamage={props.Encounter.damage}
          config={props.config}
        />
        <Encounter
          {...props.Encounter}
          limitBreak={this.state.limitBreak}
          discordData={this.state.discordData}
          config={props.config}
        />
      </div>
    )
  }
}

const Overlay = withHelper({ WrappedComponent: OverlayRaw })
export default Overlay
