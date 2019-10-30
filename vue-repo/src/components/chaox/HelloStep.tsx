import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class HelloStep extends Vue {
  @Prop({default: 0, type: Number}) private message!: number

  public render () {
    // const { message } : HelloStep = this;
    return(
      <div>
        this is step: {this.message}
        <v-btn text small loading={true} color={'primary'}></v-btn>
      </div>
    )
  }
}