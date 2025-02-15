import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../../../../components/form-input/form-input.component';
import { DestinationsService } from '../../../../services/destinations.service';
import { ButtonComponent } from '../../../../components/button/button.component';
import {
  EMAIL_REGEX_PATTER,
  URL_REGEX_PATTERN,
} from '../../../../utils/patterns';
import { Destination } from '../../../../models/destination.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

export interface DestinationData {
  code: string;
  name: string;
  airportName: string;
  airportUrl: string;
  imageUrl: string;
  email: string;
}

@Component({
  selector: 'app-destination-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './destination-editor.component.html',
  styleUrls: ['./destination-editor.component.scss'],
})
export class DestinationEditorComponent implements OnInit {
  @Input() initialState: Destination | null = null;
  @Input() isEdit = false;
  @Input() isLoading = false;
  @Output() onsave = new EventEmitter<DestinationData>();

  FALLBACK_IMAGE_URL = 'url(/assets/default-fallback-image.png)';

  form: FormGroup;

  previewImageURL = signal<string>('');

  constructor(private destinationsService: DestinationsService) {
    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/i),
      ]),

      name: new FormControl('', Validators.required),
      airportName: new FormControl('', Validators.required),

      airportUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(URL_REGEX_PATTERN),
      ]),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(URL_REGEX_PATTERN),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX_PATTER),
      ]),
    });

    const imageUrlSignal = toSignal<string>(
      this.form
        .get('imageUrl')!
        .valueChanges.pipe(startWith(this.form.get('imageUrl')!.value))
    );

    effect(async () => {
      const imageURL = imageUrlSignal();
      if (!imageURL || !imageURL.match(URL_REGEX_PATTERN)) {
        this.previewImageURL.set(this.FALLBACK_IMAGE_URL);
        return;
      }

      try {
        await fetch(imageURL);
        this.previewImageURL.set(`url(${imageURL})`);
      } catch {
        this.previewImageURL.set(this.FALLBACK_IMAGE_URL);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.initialState) {
      this.form.patchValue({
        code: this.initialState.code,
        name: this.initialState.name,
        airportName: this.initialState.airportName,
        airportUrl: this.initialState.airportUrl,
        imageUrl: this.initialState.imageUrl,
        email: this.initialState.email,
      });
    }

    if (this.isEdit) {
      this.form.get('code')?.disable();
    }
  }

  save() {
    if (this.form.valid) {
      this.onsave.emit({
        code: this.form.value.code ?? this.initialState?.code,
        name: this.form.value.name,
        airportName: this.form.value.airportName,
        airportUrl: this.form.value.airportUrl,
        imageUrl: this.form.value.imageUrl,
        email: this.form.value.email,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
