import { Component, Vue } from 'vue-property-decorator';
import HelloStep from './HelloStep'

@Component
export default class HelloChaox extends Vue{
  
  private message: string = 'world'
  public step: number = 4
  public render () {
    const { message } : HelloChaox = this;

  return(
    <div>
      <HelloStep message={this.step}/>
      <h5> Hello Chaox {message}</h5>
      <v-avatar color="indigo" size="36">
        <span class="white--text headline">36</span>
      </v-avatar>
    </div>
  
  )
  }
}